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

const FetchAppt = (props) => {
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
      
      useEffect(() => {

        fetchAppointments();
      }, []);



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
    //   console.log(docid);
    //   localStorage.setItem('docid', docid);

      return(
        <div>
                <Navbar />
        <Container>

<MDBContainer>
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
                    </MDBContainer>
               
            </Container>


        </div>
    );
 }
export default FetchAppt;





// function Dashboard(){
        
// }


