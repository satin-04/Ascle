import React,{useState} from 'react'
import Navbar from './navbar.js'
import { Link} from 'react-router-dom'
import { createUser } from './components/Chat/ChatUserCreate.js';
import Alert from '@mui/material/Alert';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput, MDBCardBody, } from 'mdb-react-ui-kit';

export default function SignUpDoctor(){
    const [DoctorEmail, setEmail] = useState("");
    const [Doctorpassword, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [supportsCovidCare, setSupportsCovidCare] = useState("");
    const [hospitalName, setHospitalname] = useState("");
    const [alertApp, setAlert] = useState(false);
    // const [address,setAddress] = useState("");

    async function loginDoctor(e){
        e.preventDefault();
        let item = {
            "email":DoctorEmail,
            "password" : Doctorpassword,
            "firstName": firstname,
            "lastName": lastname,
            "specialization" : specialization,
            "hospitalName" : hospitalName,
            // "address": address,
            "description":0.0,
            "longitude":0.0,
            "supportsCovidCare":supportsCovidCare,
        }
         let res = await fetch("http://20.92.228.100:8080/api/account/create-doctor",{
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
                { alertApp && <Alert severity="success">Your have successfully Signed Up as a Doctor!</Alert>}
                <div className='body-home' style={{marginTop:"20px"}}>
                    <p className="h4 text-center mb-4">Welcome to Ascle Doctor Sign Up</p>
                </div>
                
                <MDBContainer>

                <MDBRow>
                    <MDBCol sm='3'> </MDBCol>

                    <MDBCol sm='6'>

                    <MDBCard className="bg-image hover-overlay hover-zoom hover-shadow shadow-5">
                        <MDBCardBody>


                    <form onSubmit={loginDoctor}>
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
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Specialization </label>
                            <input type="text" name="specialization" id="defaultFormRegisterNameEx" className="form-control" 
                             onChange={(e)=>setSpecialization(e.target.value)}/>
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Hospital Name</label>
                            <input type="text" name="hospitalName" id="defaultFormRegisterNameEx" className="form-control"
                             onChange={(e)=>setHospitalname(e.target.value)} />
                        </div>

                        {/* <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Address</label>
                            <input type="text" name="address" id="defaultFormRegisterNameEx" className="form-control"
                             onChange={(e)=>setAddress(e.target.value)} />
                        </div> */}

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Supports Covid Care</label>
                            <select name="supportsCovidCare" onChange={(e)=>setSupportsCovidCare(e.target.value)}>
                                <option value="True">True</option>
                                <option value="False">False</option>
                            </select>
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Email </label>
                                <input type="email" name="DoctorEmail" id="defaultFormRegisterNameEx" className="form-control"
                                onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <br />

                        <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Password </label>
                            <input type="password" name="Doctorpassword" id="defaultFormRegisterPasswordEx" className="form-control"
                            onChange={(e)=>setPassword(e.target.value)}/>
                        </div>

                        <div className="text-center py-4 mt-3">
                            <button className="btn btn-success">Submit</button>
                        </div>

                        <div className="text-center mt-3">
                            <h5>   Already have an account?  {" "}<Link to = "/LoginDoctor">Login</Link></h5>
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

