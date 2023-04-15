import axios from '../../utils/axios';
import React from 'react'
import {login} from '../../utils/Constants'
import jwtDecode from 'jwt-decode';
import { useDispatch } from "react-redux";
import {setAuthAdmin} from "../../features/AdminAuthSlice"
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2";
// import './AdminLogin.css'

function AdminLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

   const  handleAdminLogin = (e)=>{
            e.preventDefault()
            const body = JSON.stringify({
                'email': e.target.adminemail.value,
                'password': e.target.password.value,
            })

            axios.post(login, body, {
                headers: { "Content-Type": "application/json" },
            })
            .then ((response)=> {
                console.log(response)
                if (response.status === 200) {
                    const decodedToken = jwtDecode(response.data.access)
                    if (decodedToken.is_superuser){

                        localStorage.setItem('authTokens', JSON.stringify(response.data))
                    
                        dispatch(setAuthAdmin({adminAuthToken: JSON.stringify(response.data), admin:  jwtDecode(response.data.access) }))
                        
                        navigate("/admin/dashboard");
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login Successfully",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Invalid Credentials",
                            showConfirmButton: false,
                            timer: 1500,
                            });
                    }
 
                }else{
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Invalid Credentials",
                        showConfirmButton: false,
                        timer: 1500,
                        });
                }
            }).catch((err)=>{
                console.log(err)
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Invalid Credentials",
                    showConfirmButton: false,
                    timer: 1500,
                    });
            })
   }

  return (
    <div>
        <div className="container d-flex mt-5 justify-content-center">
            <div className="row ">
            <div className="col">
                <div className="login-content d-flex flex-column">
                    <div className="login-logo mb-2">
                        <h3>Admin Panel</h3>
                    </div>
                    <div className="login-form">
                        <form onSubmit={handleAdminLogin} >
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="adminemail" className="form-control" placeholder="Email"></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Password"></input>
                            </div>
                            <button type="submit" className="btn btn-success mt-3">Login as Admin</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AdminLogin