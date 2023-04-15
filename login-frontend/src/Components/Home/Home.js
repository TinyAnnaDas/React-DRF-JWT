import React from 'react'
import "./Home.css"
import {useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import {logoutUser} from '../../features/AuthSlice'

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.authToken.user)

  return (
   
    <div className='Home mx-auto'>
      <div className='row '>
        <div className='col'>
        <div className="card">
            <h5 className="card-text" style={{paddingTop:"1.5rem"}}><i className="fas fa-home"></i> Home</h5>
            <h2 className="card-title" style={{paddingTop:"1.5rem"}}> Welcome {user.first_name}</h2>
            <img src= {require("../../assets/images/home.avif")} className="card-img-top" alt="profile"></img>
            <div className="card-body d-flex  flex-column ">
                {/* <h5 className="card-title"><i className="fas fa-home"></i> Home</h5> */}
                <button className="btn btn-success  " onClick={()=>navigate("/profile")}> Go to Profile <i style={{marginLeft: '1rem'}} className="fas fa-arrow-right"></i> </button>
                <button onClick={()=> {dispatch(logoutUser())}} className="btn btn-danger mt-2"> <i style={{marginRight: '1rem'}} className="fas fa-arrow-left"></i> Logout </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Home