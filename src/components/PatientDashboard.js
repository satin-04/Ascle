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


const accessToken = localStorage.getItem('tokenPat');

const FeaturedDoctors = (props) => {
    const param=useParams()
        console.log(param.userId);
        const param1 = param.userId;
    let presentInfo = [];
    const classes = useStyles();
    const[query,setquery] = useState("");
    const [value, setValue] = React.useState(3);
    const [doctors, setDoctors] = useState([]);
    const [insurance, setInsurances] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [covidCare,setCovidCare] = useState(false);
    const [doc,setDoc] = useState("");
    const [appt, setAppt] = useState([]);
    const userId = param.userId;

    var docid = [];

    
      const fetchProducts = () => {
        axios
          .get('http://20.92.228.100:8080/api/account/all-doctors')
          .then((res) => {
            console.log(res);
            setDoctors(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
      useEffect(() => {
        fetchProducts();
        fetchInsurances();
        fetchAppointments();
      }, []);

      const fetchInsurances = () => {
        axios
          .get('http://20.92.228.100:8080/api/insurance/all-insurance-packages')
          .then((res) => {
            console.log(res);
            setInsurances(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const fetchAppointments = () => {
        axios
          .get('http://20.92.228.100:8080/api/appointments/get-by-patient/'+`${param1}`, { headers: { Authorization: accessToken } })
          .then((res) => {
            console.log(res);
            setAppt(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };


      for(var i=0;i<doctors.length;i++){
          docid.push(doctors[i].userId);
      } 
      console.log(docid);
      localStorage.setItem('docid', docid);

      async function buy(e){
        e.preventDefault();
         let res = await fetch("http://20.92.228.100:8080/api/insurance/add-insurance-package/package-1/",{
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": accessToken
              },
            body:''
         }).then(response => {
            return response.json()
        }).catch(err => { 
            this.setState({errorMessage: err.message})})
            console.log(res);
            // const tokenIns = res.token;
            // console.log(tokenIns);
            // localStorage.setItem('tokenIns', tokenIns);
            // if(res.success == true){
            //     navigate('/InsuranceDashboard');
            // }
    }

      return(
        <div>
                <Navbar />

                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={2} class="d-grid gap-2"> 
                        <div className={classes.root}>
                        <Link to={`${param1}/insurancePackage`}>
                            <MDBBtn>
                                Your Insurance Packages
                            </MDBBtn>
                            </Link>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={2}> 
                        <div className={classes.root}>
                        <Link to={'/chat'}>
                            <MDBBtn>
                                Chat
                            </MDBBtn>
                            </Link>
                        </div>
                    </Grid>

                    
                    <Grid item xs={12} md={2}> 
                        <div className={classes.root}>
                        <Link to={'/covidTest'}>
                            <MDBBtn>
                            Take Covid Questionnaire
                            </MDBBtn>
                            </Link>
                        </div>
                    </Grid>

                    

                    <Grid item xs={12} md={2}> 
                        <div className={classes.root}>
                        <MDBBtn toggle onClick={(event) => {
                            setCovidCare(!covidCare);
                        }}>
                                Supports Covid Care
                            </MDBBtn>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={2} class="d-grid gap-2"> 
                        <div className={classes.root}>
                        <Link to={`${param1}/Appt`}>
                            <MDBBtn>
                                Your Appointments
                            </MDBBtn>
                            </Link>
                        </div>
                    </Grid>

                    

                    <div style={{padding:'20px'}}>
                        {/* <input id="standard-search" label="Search field" type="search" onChange={(e) => setquery(e.target.value)}/> */}
                        <TextField id="standard-search" label="Search field" type="search" onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }} />

                        <Button variant="outlined" color="primary" >
                                    Search
                        </Button>
                        <div className="grid">
                
            {doctors.filter((val)=>{
                if(query==""){
                    return val
                } else if (val.name.toLowerCase().includes(query.toLowerCase())){
                        return val
                }
            }).map((val,key)=>{
                presentInfo.push({firstName: val.firstName, lastName: val.lastName})
            })}

            {/* {presentInfo.map(RenderCard)} */}
 
                
        </div>
                    </div>
                    
                </Grid>


                
            

        <Container>
                {/* <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6}> 
                <p> <b> <h2> Available Doctors </h2> </b> </p>
                    {doctors.filter((val)=> {
                        if(searchTerm=="") {
                            return val;
                        }
                        else if(val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                    }).filter((val)=> {
                        if(!covidCare || val.supportsCovidCare) {
                            return val;
                        }
                    }).map((doctor) => ( 
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/doctorlogo.png"
                                alt="Patient"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {doctor.firstName}  {doctor.lastName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                   {doctor.specialization}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    {doctor.hospitalName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    
                                    supportsCovidCare: {doctor.supportsCovidCare.toString()}
                                
                                </Typography>
                                
                                <Rating name="read-only" value={value} readOnly />
                                <br></br>
                                <Link to={`/${doctor.userId}/bookAppointment`}>
                                    
                                    <Button variant="outlined" color="primary" className="appointment">
                                        Book Appointment
                                    </Button>
                                </Link>
                            </CardContent>
                            
                        </Card>
                     ))}
                    </Grid> */}


{/* <MDBContainer>
                        <MDBRow>
                           <div style={{textAlign:"center"}}>
                                <p> <b> <h2> Booked Appointments </h2> </b> </p>
                            </div>
                            {appt.map((doctor) => (
                                <MDBCol sm="4">
                            <MDBCard style={{ width: '18rem' }} className="shadow-5" >
                                <div className="bg-image hover-overlay hover-zoom hover-shadow">
                                <img src="/doctorlogo.png"  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
                                </div>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                    <b>{doctor.doctor.firstName}  {doctor.doctor.lastName}</b>
                                    </MDBCardTitle>
                                    <MDBCardText>
                                        Specialization: {doctor.specialization}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Hospital Name: {doctor.hospitalName}
                                    </MDBCardText>
                                    <MDBCardText>
                                     {doctor.date}
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                            ))}
                            
                        </MDBRow>
                    </MDBContainer> */}


                    <MDBContainer>
                        <MDBRow>
                           <div style={{textAlign:"center"}}>
                                <p> <b> <h2> Available Doctors </h2> </b> </p>
                            </div>
                            {doctors.filter((val)=> {
                                if(searchTerm=="") {
                                    return val;
                                }
                                else if(val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val;
                                }
                            }).filter((val)=> {
                                if(!covidCare || val.supportsCovidCare) {
                                    return val;
                                }
                            }).map((doctor) => (
                                <MDBCol sm="4">
                            <MDBCard style={{ width: '18rem' }} className="shadow-5" >
                                <div className="bg-image hover-overlay hover-zoom hover-shadow">
                                <img src="/doctorlogo.png"  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
                                </div>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                    <b>{doctor.firstName}  {doctor.lastName}</b>
                                    </MDBCardTitle>
                                    <MDBCardText>
                                        Specialization: {doctor.specialization}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Hospital Name: {doctor.hospitalName}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Supports Covid Care: {doctor.supportsCovidCare.toString()}
                                    </MDBCardText>
                                    <Rating name="read-only" value={value} readOnly />
                                    <Link to={`/${doctor.userId}/bookAppointment`}>
                                    
                                    <Button variant="outlined" color="primary" className="appointment">
                                        Book Appointment
                                    </Button>
                                </Link>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                            ))}
                            
                        </MDBRow>
                    </MDBContainer>



                    <MDBContainer>
                        <MDBRow>
                           <div style={{textAlign:"center"}}>
                           <p> <b> <h2> Available Insurance Plans </h2> </b> </p>
                            </div>
                            {insurance.map((ins) => ( 
                                <MDBCol sm="4">
                            <MDBCard style={{ width: '18rem' }} className="shadow-5" >
                                <div className="bg-image hover-overlay hover-zoom hover-shadow">
                                <img src="/Insurance.jpeg" style={{width:"100%", height: '13rem'}} alt='...' position='top' />
                                </div>
                                <MDBCardBody>
                                    <MDBCardTitle>
                                    <b>{ins.packageName}</b>
                                    </MDBCardTitle>
                                    <MDBCardText>
                                        Firm Name: {ins.firmName}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Package Details: {ins.packageDetails}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Insurance Premium: {ins.premium}
                                    </MDBCardText>
                                    <MDBCardText>
                                        Insurance Deductible: {ins.deductible}
                                    </MDBCardText>
                                    
                        
                                    <Button variant="outlined" color="primary" className="appointment" onClick={buy}>
                                        Buy
                                    </Button>
                                
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                            ))}
                            
                        </MDBRow>
                    </MDBContainer>

                {/* <Grid container spacing={2} alignItems="center" justifyContent="center"> */}

                    {/* <Grid item xs={12} md={6}> 
                    
                    {insurance.map((ins) => ( 
                         
                    
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/doctorlogo.png"
                                    alt="Patient"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {ins.packageName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {ins.firmName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                       {ins.packageDetails}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        {ins.premium}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" component="div">
                                        {ins.deductible}
                                    </Typography>
                                   
                                    <br></br>
                                    
                                        <Button variant="outlined" color="primary" className="appointment" onClick={buy}>
                                            Buy
                                        </Button>
                                    
                                </CardContent>
                            </Card>
                    ))}
                        </Grid> */}
                            

                    {/* </Grid> */}
                    
               
            </Container>


        </div>
    );
 }
export default FeaturedDoctors;





// function Dashboard(){
        
// }


