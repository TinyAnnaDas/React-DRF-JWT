import React from 'react'
import UserTable from '../UserTable/UserTable'
import { useDispatch } from "react-redux";
import {logoutAdmin} from "../../features/AdminAuthSlice"

import './AdminDashboard.css'

function AdminDashboard() {

   const dispatch = useDispatch()

  return (
    <div>
        <div className="d-flex" id="wrapper">
            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold  border-bottom"><i
                    className="fas fa-tachometer-alt me-2"></i>Admin Panel
                </div>
                <div className="list-group list-group-flush my-3">
                    <a href="/admin/dashboard/" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                            className="fas fa-users me-2"></i>Users</a>
                    <button onClick={()=> dispatch(logoutAdmin())}  className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i
                            className="fas fa-power-off me-2" ></i>Logout</button>
                </div>
            </div>
            

              
            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                        <h2 className="fs-2 m-0">Dashboard</h2>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <div className="container-fluid px-4">
                    <div className="row my-5">
                        {/* <h3 className="fs-4 mb-3">Registered Users</h3> */}
                        <div className="col tableContainer border rounded" >
                            <UserTable />
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    </div>
  )
}

export default AdminDashboard