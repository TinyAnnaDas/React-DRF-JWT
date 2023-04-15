
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {userCreate} from "../../utils/Constants"
import Swal from 'sweetalert2';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {create} from '../../features/UpdateUserSlice'

// import {allUsers} from "../../utils/Constants"

function CreateUser() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()
  // const [users, setUsers] = useState([])
  const dispatch = useDispatch()



  const handleCreateUser = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append('first_name', e.target.firstName.value);
    body.append('last_name', e.target.lastName.value);
    body.append('email', e.target.email.value);
    body.append('password', e.target.password.value);

    const authTokens = JSON.parse(localStorage.getItem('authTokens'))
    const access = authTokens.access;

    axios
          .post(userCreate, body, {
             headers: { "Authorization": `Bearer ${access}`,'Content-Type': 'multipart/form-data' },
          })
          .then ((response) => {
			
            if (response.status === 201) {
              Swal.fire({
                title: 'Success',
                text: "The user has been created",
                icon: 'success',
              }).then(() => {
                navigate('/admin/dashboard');
                handleClose()
                dispatch(create())
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
     
      <Button className='btn btn-sm' variant="success" onClick={handleShow}>
       Create User
      </Button>
     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        
      >
        
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
       
        <Modal.Body className='d-flex  align-items-center flex-column'>
          <form onSubmit={handleCreateUser} encType="multipart/form-data" >
            <div className="form-group">
              <small><label >First Name</label></small>
              <input type="text" name='firstName' className="form-control"  aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <small><label >Last Name</label></small>
              <input type="text" name='lastName' className="form-control"  aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <small><label >Email</label></small>
              <input type="email" name='email' className="form-control"  aria-describedby="emailHelp" />
            </div> 
            <div className="form-group">
              <label >Password</label>
              <input type="password" name='password' className="form-control"  />
           </div>       
       
        
       
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button >
          <button className='btn btn-success' type='submit'> Create</button>
          {/* <Button variant="success" type="submit" >Create</Button> */}
        </Modal.Footer>
        </form>
        </Modal.Body>
      </Modal>
      
      
    </>
  );
}

export default CreateUser