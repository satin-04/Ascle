import React, {useRef, useState} from 'react';
import Navbar from '../navbar.js'
import Grid from '@material-ui/core/Grid';
import { render } from '@testing-library/react';
import { Container, Typography } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@material-ui/core/Button';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from '@material-ui/lab/Rating';
// import './bookAppointment.css';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: 300,
      },
    
  }));

  const Item = styled(Paper)(({ theme }) => ({
    boxShadow: 'None',
    padding: theme.spacing(1),

    marginTop: '30px',
    textAlign: 'center',
  }));

function InsuranceProfile() {
    const classes = useStyles();

    return (
        <div>

            <Navbar />

            <Container>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                    <Typography gutterBottom variant="h5" component="div" style={{paddingTop:'20px'}}>
                            Insurance Provider Name
                        </Typography>
                        <div className={classes.root}>
                            <Avatar alt="Remy Sharp" src="doctorlogo.png" className={classes.large}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Grid item sx={12} md={4}>
                            <Typography gutterBottom variant="h7" component="div" style={{paddingTop:'20px'}}>
                                
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" placeholder="First Name" />
                            </div>

                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography gutterBottom variant="h7" component="div">
                                
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" placeholder="Last Name" />
                            </div>

                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant="h7" component="div">
                                
                            <div className="form-group">
                                <label>Firm Name</label>
                                <input type="text" name="firmName" placeholder="Firm Name" />
                            </div>
    
                        </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="email" placeholder="Enter email" className="form-group"/>
                        </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                        <button type= 'submit' style={{ marginLeft: '100px' }} className="btn btn-success">Update</button>
                        </Grid>
                        
                    </Grid>

                </Grid>

                <Grid  xs={12} md={12}>
                    <div>
                        <h3>Scheduled Appointments</h3>
                    </div>

                    <div>

                    <Card sx={{ maxWidth: 345 }} style={{padding:'20px'}}>
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
                                    Day
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Date
                                </Typography>
                                {/* <Typography variant="body2" color="text.secondary">
                                Speciality
                                </Typography> */}
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Number
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Address
                                </Typography>
                                <br></br>
                                
                            </CardContent>
                        </Card>

                    </div>
                </Grid>

                <Grid  xs={12} md={12}>
                    <div>
                        <h3>Upload Covid Report</h3>
                        <Button style={{backgroundColor:'black',color:'white'}}><b>Upload</b></Button>
                    </div>
                </Grid>
                


            </Container>

        </div>
    )
}

export default InsuranceProfile;

