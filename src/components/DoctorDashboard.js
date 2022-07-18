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
import { useParams } from 'react-router-dom';

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

export default function DoctorDashboard() {
    const accessToken = localStorage.getItem('tokenDoc');
    const param=useParams();
    const userId = param.userId;
    const classes = useStyles();
    const [value, setValue] = React.useState(2);
    const [patientAppointment, setPatientAppointment] = useState([]);
    const [count,setCount] = useState(10);
    const [day,setDay] = useState("");
    const [time,setTime] = useState("");


      useEffect(() => {
        fetchProducts();
      }, []);
    
    const fetchProducts = () => {
        axios
          .get('http://20.92.228.100:8080/api/appointments/get-by-doctor/'+`${userId}`,
          { headers: { Authorization: accessToken } }
          )
          .then((res) => {
             setPatientAppointment(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      return(
        <div>
                <Navbar />

                <Grid container spacing={2} alignItems="center" justifyContent="center">

                    <Grid item xs={3}> 
                        <div className={classes.root}>
                            <Button variant="outlined" color="primary" onClick={(event) => {
                            setCount(count+1);
                        }}>
                                Add Beds
                            </Button>
                        </div>
                    </Grid>

                    

                    <Grid item xs={3}> 
                        <div className={classes.root}>
                            <Button variant="outlined" color="primary">
                                Number of Beds Available: {count}
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={3}> 
                        <div className={classes.root}>
                            <Button variant="outlined" color="primary" onClick={(event) => {
                            setCount(count-1);
                        }}>
                                Remove Beds
                            </Button>
                        </div>
                    </Grid>
                    
                </Grid>

                <Grid item xs={12} md={3}> 
                        <div className={classes.root}>
                        <Link to={'/chat'}>
                            <MDBBtn>
                                Chat
                            </MDBBtn>
                            </Link>
                        </div>
                    </Grid>

        <Container>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={4}> 
                    {patientAppointment.map((patient) => ( 
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/doctorlogo.png"
                                alt="Patient"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div"> 
                                <Link to = "/doctorViewProfile">{patient.patient.firstName}  {patient.patient.lastName}</Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                {patient.date.split("T")[0]}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    {/* {doctor.hospitalName} */}Col
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Address
                                </Typography> 
                            </CardContent>
                            
                        </Card>
                     ))}
                    </Grid>


                    {/* <Grid item xs={12} md={4}> 

                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="doctorlogo.png"
                                alt="Patient"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Patient Name
                                </Typography>
                                
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Number
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Address
                                </Typography>
                                
                            </CardContent>
                        </Card>

                     </Grid>  */}

                </Grid>
               
            </Container>


        </div>
    );

    //   return(
    //     <div>
    //             <Navbar />

    //             <Grid container spacing={2} alignItems="center" justifyContent="center">

    //                 <Grid item xs={4}> 
    //                     <div className={classes.root}>
    //                         <Button variant="outlined" color="primary" onClick={(event) => {
    //                         setCount(count+1);
    //                     }}>
    //                             Add Beds
    //                         </Button>
    //                     </div>
    //                 </Grid>

                    

    //                 <Grid item xs={4}> 
    //                     <div className={classes.root}>
    //                         <Button variant="outlined" color="primary">
    //                             Number of Beds Available: {count}
    //                         </Button>
    //                     </div>
    //                 </Grid>

    //                 <Grid item xs={4}> 
    //                     <div className={classes.root}>
    //                         <Button variant="outlined" color="primary" onClick={(event) => {
    //                         setCount(count-1);
    //                     }}>
    //                             Remove Beds
    //                         </Button>
    //                     </div>
    //                 </Grid>
                    
    //             </Grid>

    //     <Container>
    //             {/* <Grid container spacing={2} alignItems="center" justifyContent="center">
    //                 <Grid item xs={12} md={4}> 
    //                 {patientAppointment.map((patient) => ( 
    //                     <Card sx={{ maxWidth: 345 }}>
    //                         <CardMedia
    //                             component="img"
    //                             height="140"
    //                             image="doctorlogo.png"
    //                             alt="Patient"
    //                         />
    //                         <CardContent>
    //                             <Typography gutterBottom variant="h5" component="div"> 
    //                             <Link to = "/doctorViewProfile">{patient.patient.firstName}  {patient.patient.lastName}</Link>
    //                             </Typography>
    //                             <Typography variant="body2" color="text.secondary" component="div">
    //                             {patient.date}
    //                             </Typography>
    //                             <Typography variant="body2" color="text.secondary" component="div">
                                    
    //                             </Typography>
    //                             <Typography variant="body2" color="text.secondary" component="div">
    //                                 Address
    //                             </Typography> 
    //                         </CardContent>
                            
    //                     </Card>
    //                  ))}
    //                 </Grid> */}

    //             <MDBContainer>

    //                 <MDBRow>
    //                     <div style={{textAlign:"center"}}>
    //                         <p> <b> <h2> Patient Appointments </h2> </b> </p>
    //                     </div>
    //                 {patientAppointment.filter((val)=>{
    //                     let dateList = val.date.split("T");
                        
    //                     setDay(dateList[0]);
    //                     setTime(dateList[1].slice(0,10));
                        
    //                 }).map((patient) => (
    //                     <MDBCol sm="4">
    //                         <MDBCard style={{ width: '18rem' }} className="shadow-5" >
    //                             <div className="bg-image hover-overlay hover-zoom hover-shadow">
    //                             <img src="/doctorlogo.png"  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
    //                             </div>
    //                             <MDBCardBody>
    //                                 <MDBCardTitle>
    //                                 <b>{patient.patient.firstName}  {patient.patient.lastName}</b>
    //                                 </MDBCardTitle>
    //                                 <MDBCardText>
    //                                 {patient.date}
    //                                 </MDBCardText>
    //                                 <MDBCardText>
    //                                    {day}
    //                                 </MDBCardText>
    //                                 <MDBCardText>
    //                                    {time}
    //                                 </MDBCardText>
    //                             </MDBCardBody>
    //                         </MDBCard>
    //                         </MDBCol>
    //                         ))}
    //                         </MDBRow>
    //                     </MDBContainer>

    //                 {/* <Grid item xs={12} md={4}> 

    //                     <Card sx={{ maxWidth: 345 }}>
    //                         <CardMedia
    //                             component="img"
    //                             height="140"
    //                             image="doctorlogo.png"
    //                             alt="Patient"
    //                         />
    //                         <CardContent>
    //                             <Typography gutterBottom variant="h5" component="div">
    //                             Patient Name
    //                             </Typography>
                                
    //                             <Typography variant="body2" color="text.secondary" component="div">
    //                                 Number
    //                             </Typography>
    //                             <Typography variant="body2" color="text.secondary" component="div">
    //                                 Address
    //                             </Typography>
                                
    //                         </CardContent>
    //                     </Card>

    //                  </Grid>  */}

    //             {/* </Grid> */}
               
    //         </Container>


    //     </div>
    // );
 }





// function Dashboard(){
        
// }


