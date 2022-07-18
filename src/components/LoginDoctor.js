import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import './Login.css';
import Navbar from '../navbar.js'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { Link, useHistory} from 'react-router-dom'

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, } from 'mdb-react-ui-kit';

export default function LoginDoctor(){
    const navigate = useNavigate();
    var loginData;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    // const handleSubmit = () => {
    //     var emailValid = false;
    //     if(email.length == 0){
    //         setEmailError("Email is required");
    //     }        
    //     else if(email.length < 6){
    //         setEmailError("Email should be minimum 6 characters");
    //     }      
    //     else if(email.indexOf(' ') >= 0){        
    //         setEmailError('Email cannot contain spaces');                          
    //     }    
    //     else{
    //         setEmailError("")
    //         emailValid = true
    //     }
    
    //     var passwordValid = false;
    //     if(password.length == 0){
    //         setPasswordError("Password is required");
    //     }        
    //     else if(password.length < 6){
    //         setPasswordError("Password should be minimum 6 characters");
    //     }      
    //     else if(password.indexOf(' ') >= 0){        
    //         setPasswordError('Password cannot contain spaces');                          
    //     }    
    //     else{
    //         setPasswordError("")
    //         passwordValid = true
    //     }        
    
    //     if(emailValid && passwordValid){            
    //         alert('Email: ' + email + '\nPassword: ' + password); 
    //         setEmail("");
    //         setPassword("");
    //     }        
    
    //   }

    async function login(e){
        e.preventDefault();
        let item = {
            "email":email,
            "password" : password,
        }
         let res = await fetch("http://20.92.228.100:8080/api/account/login",{
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "x-access-token": "token-value",
              },
            body: JSON.stringify(item)
         }).then(response => {
            return response.json()
        })
        console.log(res);
        const tokenDoc = res.token;
        console.log(tokenDoc);
        localStorage.setItem('tokenDoc', tokenDoc);
        sessionStorage.setItem('user_type',res.user.userType);
        localStorage.setItem('user_type',res.user.userType);
        localStorage.setItem('docName', res.user.firstName.toLowerCase());
        const doctorId = res.user.userId;
        if(res.success == true){//DoctorDashboard
            navigate(`/${doctorId}/DoctorDashboard`);
        }
    }
    
        return (
            <div className="row">
                <Navbar/>
                <div className='body-home' style={{marginTop:"20px"}}>
                    <p className="h4 text-center mb-4">Welcome to Ascle Doctor Login</p>
                </div>
                <MDBContainer>

                <MDBRow>
                    <MDBCol sm='3'> </MDBCol>

                    <MDBCol sm='6'>

                    <MDBCard className="bg-image hover-overlay hover-zoom hover-shadow shadow-5">
                        <MDBCardBody>

                    <form onSubmit = {login}>
                    <div>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Email </label>
                                <input type="email" name="email" id="defaultFormRegisterNameEx" className="form-control"
                                onChange={(e)=>setEmail(e.target.value)} />
                                {emailError.length > 0 && <p>{emailError}</p> }
                        </div>
                        <br />
                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Password </label>
                            <input type="password" name="password" id="defaultFormRegisterPasswordEx" className="form-control"
                            onChange={(e)=>setPassword(e.target.value)}/>
                            {passwordError.length > 0 &&
            
            <p>{passwordError}</p>
          }
                        </div>
                        <div className="text-center py-4 mt-3">
                        <button className="btn btn-success">Login</button>
                        </div>
                        <div className="text-center mt-3 grey-text">
                          <Link to = "">Forgot Password?</Link>
                          <br />
                          <Link to = "/SignUpDoctor">Sign up</Link>
                        </div>
                    </form>
                </MDBCardBody>
                </MDBCard>
                </MDBCol>
                <MDBCol sm='3'> </MDBCol>
                </MDBRow>
                </MDBContainer>
            </div>
        );
    }
