import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom'
import axios from 'axios';
import { Container } from '@mui/material';
import './dashboard.css';
import Navbar from '../navbar.js'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Alert from '@mui/material/Alert';

import {MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));




  export default function InsuranceDashboard(){
    const [packageName, setPackageName] = useState("");
    const [comments, setComments] = useState("");
    const [premium, setPremium] = useState("");
    const [deductible, setDeductible] = useState("");
    const [alertApp, setAlert] = useState(false);
    const [packages,setPackages] = useState([]);

    const fetchProducts = () => {
        axios
          .get('http://20.92.228.100:8080/api/insurance/all-insurance-packages')
          .then((res) => {
            console.log(res);
            setPackages(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        fetchProducts();
      }, []);

  const accessToken = localStorage.getItem('tokenIns');
  console.log(accessToken);
    const classes = useStyles();
    async function createInsurance(e){
      e.preventDefault();
      let item = {
        "packageName": packageName,
        "isRecommendation":true,
        "packageDetails": comments,
        "premium": premium,
        "deductible":deductible,
        "copayment":0.0,
        "coInsurance":0.0,
        "maximumOutOfPocket":0.0
      }
       let res = await fetch("http://20.92.228.100:8080/api/insurance/create-insurance-package/",{
          method: 'POST',
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "Authorization": accessToken
            },
          body: JSON.stringify(item)
       }).then(response => {
        setAlert(true);
          return response.json()
      });
      console.log(res);
  }
      return(
        <div>
                <Navbar />

                <Container alignItems="center" justifyContent="center">
                
                <MDBContainer>                    
                    <MDBRow className='mx-auto ml-3' style={{margin:"10px"}}>
                        <MDBCol sm='12'>
                        <div >
                        <Link to={'/chat'}>
                            <MDBBtn>
                                Chat
                            </MDBBtn>
                        </Link>
                        </div>
                        
                        </MDBCol>
                    </MDBRow>


                   
                        <MDBRow>
                           <div style={{textAlign:"center"}}>
                                <p> <b> <h2> Available Insurance Packages </h2> </b> </p>
                            </div>
                            {packages.map((doctor) => (
                                <MDBCol sm="4">
                            <MDBCard style={{ width: '18rem' }} className="shadow-5" >
                                <div className="bg-image hover-overlay hover-zoom hover-shadow">
                                <img src="/doctorlogo.png"  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
                                </div>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                    <b>{doctor.packageName} </b>
                                    </MDBCardTitle>
                                    <MDBCardText>
                                    {doctor.firmName}
                                    </MDBCardText>
                                    <MDBCardText>
                                        {doctor.packageDetails}
                                    </MDBCardText>
                                    <MDBCardText>
                                        {doctor.premium}
                                    </MDBCardText>
                                    <MDBCardText>
                                        {doctor.deductible}
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                            ))}
                            
                        </MDBRow>
                    




                    {/* <MDBRow>
                        <MDBCol sm='6' style={{textAlign:"center"}}>
                    
                        <Link to = "/RegisteredPatients">  
                            
                            <MDBCard style={{ width: '20rem' }} className="shadow-5" >
                            <div className="bg-image hover-overlay hover-zoom hover-shadow">
                            <img src='doctorlogo.png'  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
                            </div>
                            <MDBCardBody>
                                <MDBCardTitle>
                                <b>Registered Patients</b>
                                </MDBCardTitle>
                            </MDBCardBody>
                            </MDBCard>
                        </Link>
                        </MDBCol>

                        <MDBCol sm='6' style={{textAlign:"center"}}>
                    
                        <Link to = "/UnRegisteredPatients">  
                            
                            <MDBCard style={{ width: '20rem' }} className="shadow-5" >
                            <div className="bg-image hover-overlay hover-zoom hover-shadow">
                            <img src='doctorlogo.png'  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
                            </div>
                            <MDBCardBody>
                                <MDBCardTitle>
                                <b>UnRegistered Patients</b>
                                </MDBCardTitle>
                            </MDBCardBody>
                            </MDBCard>
                        </Link>
                        </MDBCol>

                        </MDBRow>
                        */}
                    
                </MDBContainer> 
                
                { alertApp && <Alert severity="success">Your have successfully created an Insurance Package!!!</Alert>}

                <MDBContainer style={{margin:"20px"}}>


                <MDBRow>
                    <MDBCol sm='3'> </MDBCol>

                    <MDBCol sm='6'>

                    <MDBCard className="bg-image hover-overlay hover-zoom hover-shadow shadow-5">
                    {/* <p className="h4 text-center mb-4">Create Insurance Package</p> */}
                    <MDBCardTitle className="h4 text-center"> <b> Create Insurance Package </b></MDBCardTitle>
                        <MDBCardBody>
                    <form onSubmit={createInsurance}>

                    <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Package Name </label>
                            <input type="text" name="packageName" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setPackageName(e.target.value)}/>
                    </div>

                    <br />

                    <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Details about the Package </label>
                            <input type="text" name="comments" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setComments(e.target.value)}/>
                    </div>

                    <br />

                    <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Premium Amount </label>
                            <input type="text" name="premium" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setPremium(e.target.value)}/>
                    </div>

                    <br />

                    <div>
                        <label htmlFor="defaultFormRegisterNameEx" className="grey-text"> Deductible Sum </label>
                            <input type="text" name="deductible" id="defaultFormRegisterNameEx" className="form-control" 
                            onChange={(e)=>setDeductible(e.target.value)}/>
                    </div>

                    <br />

                    <MDBBtn>Create Insurance Package</MDBBtn>
                    </form>

                    </MDBCardBody>

                    </MDBCard>

                    </MDBCol>

                    <MDBCol sm="3"></MDBCol>

                    </MDBRow>

                    </MDBContainer>

               
                {/* <div className="col-md-3 center">
                    <form onSubmit={createInsurance}>
                        <div className="form-group">
                            <label>Package Name</label>
                            <input type="text" name="packageName" placeholder="Package Name" 
                            onChange={(e)=>setPackageName(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label>Details about the Package</label>
                            <input type="text" name="comments" placeholder="Details about the Package" 
                             onChange={(e)=>setComments(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label>Premium Amount</label>
                            <input type="number" name="premium" placeholder="Premium Amount" 
                             onChange={(e)=>setPremium(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label>Deductible Sum</label>
                            <input type="number" name="deductible" placeholder="Deductible Sum"
                             onChange={(e)=>setDeductible(e.target.value)} />
                        </div>

                        <button style={{ marginLeft: '35px' }} className="btn btn-success">Create Insurance Package</button>
                    </form>
                    </div> */}
                {/* <button style={{ marginLeft: '100px' }} className="btn btn-success" onClick= {createInsurance}>Create Insurance Package</button> */}
                </Container>


        </div>
        
     );

      }





// function Dashboard(){
        
// }


