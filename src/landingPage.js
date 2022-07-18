import React from 'react'
import Navbar from './navbar.js'
import { useNavigate } from "react-router-dom";
import { Card, Button, Alert } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useHistory } from 'react-router-dom'
import CardDoctor from './CardDoctor';
import CardPatient from './CardPatient';
import CardInsurance from './CardInsurance';
import Dashboard from './components/PatientDashboard';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import {MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


class LandingPage extends React.Component{
    render() {
        return (
            <div>
                <Navbar />
                <div className='body-home' style={{marginTop:"30px"}}>
                    <h1>Are You A</h1>
                </div>

                <MDBContainer>
                    <MDBRow style={{textAlign: "center"}}>
                        <MDBCol sm='4'>
                            <Link to = "/LoginDoctor"><CardDoctor /></Link>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <Link to = "/LoginPatient"><CardPatient  /></Link>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <Link to = "/LoginInsurance"><CardInsurance /></Link>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            
                {/* <Container maxWidth="lg">

                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Item style={{boxShadow: "none"}}><Link to = "/LoginDoctor"><CardDoctor /></Link></Item>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Item style={{boxShadow: "none"}}><Link to = "/LoginPatient"><CardPatient /></Link></Item>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Item style={{boxShadow: "none"}}><Link to = "/LoginInsurance"><CardInsurance /></Link></Item>
                    </Grid>
                    
                </Grid> */}

                {/* <Item style={{boxShadow: "none"}}><Link to = "/PatientDashboard"> Patient Dashboard </Link></Item>

                <Item style={{boxShadow: "none"}}><Link to = "/PatientProfile"> Patient Profile </Link></Item>

                <Item style={{boxShadow: "none"}}><Link to = "/DoctorProfile"> Doctor Profile </Link></Item>

                <Item style={{boxShadow: "none"}}><Link to = "/InsuranceProfile"> Insurance Profile </Link></Item>

                <Item style={{boxShadow: "none"}}><Link to = "/DoctorDashboard"> Doctor Dashboard </Link></Item>

                <Item style={{boxShadow: "none"}}><Link to = "/InsuranceDashboard"> Insurance Dashboard </Link></Item>

                <Item style={{boxShadow: "none"}}><Link to = "/Payment"> Payment </Link></Item>

                <Item style={{boxShadow: "none"}}><Link to = "/Maps"> Maps </Link></Item> */}

                {/* </Container> */}
                    
            </div>
        );
    }
}


export default LandingPage
