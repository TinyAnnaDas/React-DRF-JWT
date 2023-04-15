import React from 'react'
import avatar from '../../assets/images/avatar.svg'
import bg from '../../assets/images/bg.svg'
import './Login.css'
import {useNavigate} from "react-router-dom"
import {login} from '../../utils/Constants'
import { useDispatch } from "react-redux";
import axios from '../../utils/axios';
import {setAuth} from '../../features/AuthSlice'
import jwtDecode from 'jwt-decode';
import Swal from "sweetalert2";

function Login() {

	const navigate = useNavigate()
	const dispatch = useDispatch();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");


	const handleLogin = (e) => {
		e.preventDefault();
		const body = JSON.stringify({
            'email': e.target.email.value,
            'password': e.target.password.value,
          });


		  axios
          .post(login, body, {
            headers: { "Content-Type": "application/json" },
          })
          .then ((response) => {
			
            if (response.status === 200) {
               
                localStorage.setItem('authTokens', JSON.stringify(response.data))
                
                dispatch(setAuth({authToken: JSON.stringify(response.data), user:  jwtDecode(response.data.access) }))
				
                navigate("/");
				Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
              
            }else {
				Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Invalid Credentials",
                    showConfirmButton: false,
                    timer: 1500,
                    });
                  }
          }).catch((err) => {
            console.log(err)
			Swal.fire({
                position: "center",
                icon: "warning",
                title: "Invalid Credentials",
                showConfirmButton: false,
                timer: 1500,
                });
          });

	}

  return (
    <div>
        <img className="wave" src= {require("../../assets/images/wave.png")}   alt='wave'></img>
	<div className="container">
		<div className="img">
			<img src= {bg} alt='bg'></img>
		</div>
		<div className="login-content">
			<form onSubmit={handleLogin}>
				<img src= {avatar} alt='avatar'></img>
				<h2 className="title">Welcome</h2>
           		<div className="input-div one">
           		   <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
           		   <div className="div">
           		   		<input type="text" name='email' className="input" placeholder='Email'></input>
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	<input type="password" name='password' className="input" placeholder='Password'></input>
            	   </div>
            	</div>
                
            	{/* <a className='forgot-pass' href="#">Forgot Password?</a> */}
				<span className='forgot-pass'>Forgot Password?</span>
				{/* <button className='forgot-pass'>Forgot Password?</button> */}
            	<input type="submit" className="btn user-login-btn" value="Login"></input>
                <span className='register' onClick={()=> navigate("/signup")}>Register</span>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login