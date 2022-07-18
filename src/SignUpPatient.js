import React, {useState, useEffect} from 'react'
import Navbar from './navbar.js'
import { Link} from 'react-router-dom'
import { createUser } from './components/Chat/ChatUserCreate.js';
import Alert from '@mui/material/Alert';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput, MDBCardBody, } from 'mdb-react-ui-kit';

export default function SignUpPatient(){
    const [patientEmail, setEmail] = useState("");
    const [patientpassword, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [smoking, setSmoking] = useState("");
    const [drinking, setDrinking] = useState("");
    const [medicHistory, setMedicHistory] = useState("");
    const [allergies, setAllergies] = useState("");
    const [alertApp, setAlert] = useState(false);

    
    async function loginPatient(e){
        e.preventDefault();
        let item = { 
            "email":patientEmail,
            "password" : patientpassword,
            "firstName": firstname,
            "lastName": lastname,
            "age" : age,
            "height" : height,
            "weight": weight,
            "isSmoking": smoking,
            "isDrinking": drinking,
            "medicalHistory": medicHistory,
            "allergies": allergies,
            "latitude":0.0,
            "longitude":0.0
    }
         let res = await fetch("http://20.92.228.100:8080/api/account/create-patient",{
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "x-access-token": "token-value",
              },
            body: JSON.stringify(item)
         }).then(response => {
            setAlert(true);
            return response.json()
        });
        console.log(res);
        createUser({'username':res.firstName.toLowerCase(),'secret':'Password@1234' })
    }
    
        return (
            <div className="row">
                <Navbar/>
                { alertApp && <Alert severity="success">Your have successfully Signed Up as a Patient!</Alert>}
                <div className='body-home' style={{marginTop:"20px"}}>
                    <p className="h4 text-center mb-4">Welcome to Ascle Patient Sign Up</p>
                </div>

                <MDBContainer>

                <MDBRow>
                    <MDBCol sm='3'> </MDBCol>

                    <MDBCol sm='6'>

                    <MDBCard className="bg-image hover-overlay hover-zoom hover-shadow shadow-5">
                        <MDBCardBody>
                
                    <form onSubmit={loginPatient}>

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> First Name </label>
                            <input type="text" name="firstName" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setFirstname(e.target.value)}/>
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Last Name </label>
                            <input type="text" name="lastName" id="defaultFormRegisterNameEx" className="form-control" 
                             onChange={(e)=>setLastname(e.target.value)}/>
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Age</label>
                            <input type="text" name="age" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setAge(e.target.value)} />
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Height</label>
                            <input type="text" name="Height" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setHeight(e.target.value)} />
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Weight</label>
                            <input type="text" name="Weight" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setWeight(e.target.value)} />
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Smoking</label>
                            <select name="smoking" onChange={(e)=>setSmoking(e.target.value)}>
                                <option value="True">Yes</option>
                                <option value="False">No</option>
                            </select>
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Drinking</label>
                            <select name="drinking" onChange={(e)=>setDrinking(e.target.value)}>
                                <option value="True">Yes</option>
                                <option value="False">No</option>
                            </select>
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Medical History</label>
                            <input type="text" name="medicalHistory" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setMedicHistory(e.target.value)} />
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Allergies</label>
                            <input type="text" name="allergies" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setAllergies(e.target.value)} />
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Email </label>
                                <input type="email" name="email" id="defaultFormRegisterNameEx" className="form-control"
                                onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Password </label>
                            <input type="password" name="password" id="defaultFormRegisterPasswordEx" className="form-control"
                            onChange={(e)=>setPassword(e.target.value)}/>
                        </div>

                        <div className="text-center py-4 mt-3">
                            <button className="btn btn-success">Submit</button>
                        </div>

                        <div className="text-center mt-3">
                        <h5>   Already have an account?  {" "}<Link to = "/LoginPatient">Login</Link></h5>
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
