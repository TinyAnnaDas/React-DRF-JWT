
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../../utils/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {userUpdate} from "../../utils/Constants"
import {useDispatch} from 'react-redux'
import {edit} from '../../features/UpdateUserSlice'

function EditUser({person}) {
 
  // console.log(person)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const dispatch = useDispatch()


  const handleEditUser = (e, id) => {
    e.preventDefault();

    const body = new FormData();
    body.append('first_name', e.target.firstName.value);
    body.append('last_name', e.target.lastName.value);
    body.append('email', e.target.email.value);
   
    const authTokens = JSON.parse(localStorage.getItem('authTokens'))
    const access = authTokens.access;

    axios
          .post(`${userUpdate}${id}`, body, {
             headers: { "Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
          })
          .then ((response) => {
            console.log(response.data)
			
            if (response.status === 200) {
              Swal.fire({
                title: 'Success',
                text: "The user has been created",
                icon: 'success',
              }).then(() => {
                navigate('/admin/dashboard');
                handleClose()
                dispatch(edit())
                
              })
              
            }else {
					    alert("something went wrong")
                  }
          }).catch((err) => {
            console.log(err)
          });


  }

  



  return (
    <>
      <Button className='btn btn-sm' variant="secondary" onClick={handleShow}>
       Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>

        <Modal.Body className='d-flex justify-content-center'>
          <form  onSubmit={(e)=>handleEditUser(e, person.id)} encType="multipart/form-data">
            <div className="form-group">
              <small><label for="exampleInputEmail1" >First Name</label></small>
              
              <input type="text" defaultValue={person.first_name} name="firstName" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <small><label for="exampleInputEmail1">Last Name</label></small>
              <input type="text" defaultValue={person.last_name} name="lastName" className="form-control"  aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <small><label for="exampleInputEmail1">Email</label></small>
              <input type="email" defaultValue={person.email} name="email" className="form-control"  aria-describedby="emailHelp" />
            </div>        
       
      
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" type='submit'>Update</Button>
        </Modal.Footer>
        </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUser