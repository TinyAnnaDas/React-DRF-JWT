   import React, { useEffect, useState } from 'react'
   import axios from '../../utils/axios';
   import DataTable from 'react-data-table-component'
   import {allUsers, userDelete} from "../../utils/Constants"
import EditUser from '../EditUser/EditUser';
import CreateUser from '../CreateUser/CreateUser';
import Swal from 'sweetalert2';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {delete_user} from '../../features/UpdateUserSlice'



   function UserTable() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])

    // const [isMounted, setIsMounted] = useState(false);
    const dispatch = useDispatch()

    const createdUser = useSelector((state )=> state.updateUser.createdUser)
    const editedUser = useSelector((state )=> state.updateUser.editedUser)
    const deletedUser = useSelector((state)=> state.updateUser.deletedUser)

  
      const handleDelete = (userId) => {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'))
            const access = authTokens.access;
            const url = `${userDelete}${userId}`
            axios
            .get(url, {
              headers: { "Authorization": `Bearer ${access}`},
            })
            .then((response) => {
              dispatch(delete_user())
            })
            .catch((error) => {
              console.log("error",error);
            });

          }
        });
      };



    
    const getUsers = async() => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'))
        const access = authTokens?.access;
        try{
            const response = await axios.get(allUsers, {
                headers: { "Authorization": `Bearer ${access}`}
            })
            // console.log(response.data)
            setUsers(response.data)
            setFilteredUsers(response.data)
        }
        catch (error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getUsers()
    }, [createdUser,editedUser, deletedUser])

    useEffect(()=>{
        const result = users.filter(user => {
            return user.first_name.toLowerCase().match(search.toLowerCase())
        })
        setFilteredUsers(result)
    }, [search, users])

    const CustomTitle = () => <h5 className='mt-5' style={{ textAlign: "right", textDecoration:"underline" }}>Registered Users</h5>;

    const columns = [
    {
        name: "First Name",
        selector: row => row.first_name,
        sortable:true
    },
    {
        name: "Last Name",
        selector: row => row.last_name
    },
    {
        name: "Email Id",
        selector: row => row.email
    },
    {
        name: "Image",
        selector: row => <img width={50} height={50} src={`http://127.0.0.1:8000${row.image}`} alt="user"/>
    },
    {
        name: "Edit user",
        cell: row => <EditUser person = {row}/>
    },
 
    {
        name: "Delete user",
        cell: row => <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(row.id)} >Delete</button>
    },

    ]

     return (
        <div>
     <DataTable 
     title = {<CustomTitle/>}
     columns={columns} 
     data={filteredUsers} 
     pagination
     fixedHeader
     fixedHeaderScrollHeight='300px'
     selectableRows
     selectableRowsHighlight
     highlightOnHover
     actions={
       <CreateUser/>
     }
     subHeader
     subHeaderComponent = {
        <input 
        type="text" 
        placeholder='Search'
        className='w-25 form-control'
        value = {search}
        onChange = {(e)=> setSearch(e.target.value)}
        ></input>
     }
    
     />
     </div>
    
     )
   }
   
   export default UserTable