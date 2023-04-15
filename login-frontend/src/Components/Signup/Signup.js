import React, {useState} from 'react'
import avatar from '../../assets/images/avatar.svg'
import bg from '../../assets/images/bg.svg'
import {useNavigate} from 'react-router-dom'
import { register } from "../../utils/Constants";
import axios from '../../utils/axios';
import Swal from "sweetalert2";
// import '../Signup/Signup.css'




function Signup() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleRegistration = (e)=>{
    e.preventDefault();

    console.log(firstName)

    const body = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    
    axios.post(register, body, {
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
              console.log(response.status)
              if (response.status === 201) {
                navigate("/login");

                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Registration Successfull",
                  showConfirmButton: false,
                  timer: 1500,
                });

              } else {
                console.log("something happened")
              }
            })
            .catch((error) => {
                // const err = error.response.data.username[0]
                console.log(error.response.data)
                Swal.fire({
                  position: "center",
                  icon: "warning",
                  title: error.response.data.email,
                  showConfirmButton: false,
                  timer: 2500,
                  });
            });
  }

  return (
    <div>
      <div>
        <img className="wave" src= {require("../../assets/images/wave.png")}   alt='wave'></img>
        <div className="container">
          <div className="img">
            <img src= {bg} alt='bg'></img>
          </div>
          <div className="login-content">
            <form onSubmit={handleRegistration}>
              <img src= {avatar} alt='avatar'></img>
              <h2 className="title">Register</h2>
                  <div className="input-div one">
                    <div className="i">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                        
                        <input placeholder='First Name' type="text" className="input" value={firstName} onChange={(e)=> setFirstName(e.target.value)}></input>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="i">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                        <input placeholder='Last Name' type="text" className="input" value={lastName} onChange={(e)=> setLastName(e.target.value)}></input>
                    </div>
                  </div>
                  
                  <div className="input-div one">
                    <div className="i">
                        <i className="fas fa-envelope"></i>
                    </div>
                    <div className="div">
                        <input placeholder='Email' type="email" className="input" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                    </div>
                  </div>
                
                  <div className="input-div pass">
                    <div className="i"> 
                        <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">
                        <input placeholder='Password' type="password" className="input" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                    </div>
                  </div>
                    
                  
                  <input type="submit" className="btn user-login-btn" value="Register"></input>
                  <span className='register' onClick={()=>navigate("/login")}>Login</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup