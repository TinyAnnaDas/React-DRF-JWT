import React, {useEffect, useState} from 'react'
// import avatar from '../../assets/images/avatar.svg'
import './Profile.css'
import {useNavigate} from "react-router-dom"
import axios from '../../utils/axios';
import {imageupload, userDetails} from "../../utils/Constants"


function Profile() {

    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null);


    useEffect(()=>{
      const authTokens = JSON.parse(localStorage.getItem('authTokens'))
      const access = authTokens?.access
      axios
          .get(userDetails,{
            headers: { "Authorization": `Bearer ${access}`},
          })
          .then((response) => {
            console.log(response.data)
            setFname(response.data.first_name);
            setLname(response.data.last_name);
            setEmail(response.data.email);
            console.log(response.data.image)
            setImage(response.data?.image);
          });
    }, [image])

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const authTokens = JSON.parse(localStorage.getItem('authTokens'))
      const access = authTokens?.access
     
      const formData = new FormData();
      formData.append('image', selectedFile);
      console.log(imageupload)
      
      axios
      .put(imageupload, formData, {
        headers: { "Authorization": `Bearer ${access}`,
      }
      })
      .then((response) => {
        setImage(response.data?.image);
      })
     
      .catch((err) => console.log(err));
      
    };
  
 

  return (
    <div>
        <div className='Profile mx-auto'>
              <div className="card d-flex justify-content-center align-items-center">
                  <img src={ `http://127.0.0.1:8000${image}`} className="card-img-top" alt="profile"></img>
                  <form onSubmit={handleSubmit} style={{width:"15rem"}} className="mt-3">
                      <input className='form-control form-control-sm' type="file" onChange={handleFileChange} />
                      <button className='btn btn-sm btn-secondary mt-2' type="submit">Upload</button>
                  </form>
                 
                  <div className="card-body">
   
                      <h5 className="card-title">{fName} {lName}</h5>
                 
                   
                      
                      <p className="card-text">{email}</p>
                     
                      <button onClick={()=>navigate("/")} className="btn btn-success"> <i className="fas fa-arrow-left"></i> Back to home</button>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Profile