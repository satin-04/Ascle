import React,{useState} from 'react'
import Navbar from './navbar.js'
import { Link, useNavigate} from 'react-router-dom'
import { createUser } from './components/Chat/ChatUserCreate.js';
import Alert from '@mui/material/Alert';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput, MDBCardBody, } from 'mdb-react-ui-kit';

export default function SignUpInsurance(){
    const [insurerEmail, setEmail] = useState("");
    const [insurerpassword, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [firmname, setFirmname] = useState("");
    const [alertApp, setAlert] = useState(false);

    async function loginPatient(e){
        e.preventDefault();
        let item = {
            "email":insurerEmail,
            "password" : insurerpassword,
            "firstName": firstname,
            "lastName": lastname,
            "firmName" : firmname
        }
         let res = await fetch("http://20.92.228.100:8080/api/account/create-insurer",{
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
                { alertApp && <Alert severity="success">Your have successfully Signed Up as a Insurance Provider!</Alert>}
                <div className='body-home' style={{marginTop:"20px"}}>
                    <p className="h4 text-center mb-4">Welcome to Ascle Insurance Sign Up</p>
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
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Firm Name</label>
                            <input type="text" name="firmName" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setFirmname(e.target.value)}/>
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
                            <h5>   Already have an account?  {" "}<Link to = "/LoginInsurance">Login</Link></h5>
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




