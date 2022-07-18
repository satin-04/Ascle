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
import BookAppointment from './bookAppointment';
import { Navigate, useParams } from 'react-router-dom';

import {MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function InsurancePackage(){
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

    const [insurance, setInsurance] = useState([]);
    const accessToken = localStorage.getItem('tokenPat');
    const param=useParams()
    console.log(param);
    const param1 = param.userId;
    const fetchInsurancebyPatient = () => {
        axios
          .get('http://20.92.228.100:8080/api/insurance/get-by-patient/' + `${param1}` +'?',
          { headers: { Authorization: accessToken } }
          )
          .then((res) => {
            console.log(res);
            setInsurance(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        fetchInsurancebyPatient();
      }, []);
      console.log(insurance);
    return (
      <div>
        <Navbar />
      
        {/* <Container>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6}> 
                <p> <b> <h2> Registered Insurance Packages </h2> </b> </p>
                    {insurance.map((insurance) => ( 
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="doctorlogo.png"
                                alt="Patient"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {insurance.packageName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                   {insurance.firmName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    {insurance.packageDetails}
                                </Typography>
                            </CardContent>
                            
                        </Card>
                     ))}
                    </Grid>
                    </Grid>
                    </Container> */}



                    <MDBContainer>
                        <MDBRow>
                           <div style={{textAlign:"center",margin:"20px"}}>
                                <p> <b> <h2> Registered Insurance Packages </h2> </b> </p>
                            </div>
                            {insurance.map((insurance) => ( 
                                <MDBCol sm="4">
                            <MDBCard style={{ width: '18rem' }} className="shadow-5" >
                                <div className="bg-image hover-overlay hover-zoom hover-shadow">
                                <img src="/doctorlogo.png"  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
                                </div>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                    <b>{insurance.packageName}</b>
                                    </MDBCardTitle>
                                    <MDBCardText>
                                    {insurance.firmName}
                                    </MDBCardText>
                                    <MDBCardText>
                                    {insurance.packageDetails}
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                            ))}
                            
                        </MDBRow>
                    </MDBContainer>
                    
                    </div>     );
  }

