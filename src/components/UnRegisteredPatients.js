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

const UnRegisteredPatients = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetchProducts();
      }, []);
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
      return(
        <div>
                <Navbar />

                {/* <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}> 
                        <div className={classes.root}>
                            <Button variant="outlined" color="primary">
                                Number of Beds Available: 12
                            </Button>
                        </div>
                    </Grid>
                </Grid> */}

        <Container>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={4}> 
                    {doctors.map((doctor) => ( 
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="doctorlogo.png"
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
                                    Address
                                </Typography> 
                                
                                
                                <Rating name="read-only" value={value} readOnly />
                                <br></br>
                                <Link to={'/bookAppointment'}>
                                    <Button variant="outlined" color="primary" className="appointment">
                                        Book Appointment
                                    </Button>
                                </Link>
                            </CardContent>
                            
                        </Card>
                     ))}
                    </Grid>

                   <Grid item xs={12} md={4}> 

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
                                {/* <Typography variant="body2" color="text.secondary">
                                Speciality
                                </Typography> */}
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Number
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Address
                                </Typography>
                                {/* <Rating name="read-only" value={value} readOnly />
                                <br></br> */}
                                {/* <Link to={'/bookAppointment'}>
                                    <Button variant="outlined" color="primary" className="appointment">
                                        Book Appointment
                                    </Button>
                                </Link> */}
                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={12} md={4}> 

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
                                {/* <Typography variant="body2" color="text.secondary">
                                Speciality
                                </Typography> */}
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Number
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Address
                                </Typography>
                                {/* <Rating name="read-only" value={value} readOnly />
                                <br></br> */}
                                {/* <Link to={'/bookAppointment'}>
                                    <Button variant="outlined" color="primary" className="appointment">
                                        Book Appointment
                                    </Button>
                                </Link> */}
                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={12} md={4}> 

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
                                {/* <Typography variant="body2" color="text.secondary">
                                Speciality
                                </Typography> */}
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Number
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Address
                                </Typography>
                                {/* <Rating name="read-only" value={value} readOnly />
                                <br></br>
                                <Link to={'/bookAppointment'}>
                                    <Button variant="outlined" color="primary" className="appointment">
                                        Book Appointment
                                    </Button>
                                </Link> */}
                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={12} md={4}> 

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
                                {/* <Typography variant="body2" color="text.secondary">
                                Speciality
                                </Typography> */}
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Number
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Address
                                </Typography>
                                {/* <Rating name="read-only" value={value} readOnly />
                                <br></br>
                                <Link to={'/bookAppointment'}>
                                    <Button variant="outlined" color="primary" className="appointment">
                                        Book Appointment
                                    </Button>
                                </Link> */}
                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={12} md={4}> 

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
                                {/* <Typography variant="body2" color="text.secondary">
                                Speciality
                                </Typography> */}
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Number
                                </Typography>
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Address
                                </Typography>
                                {/* <Rating name="read-only" value={value} readOnly />
                                <br></br>
                                <Link to={'/bookAppointment'}>
                                    <Button variant="outlined" color="primary" className="appointment">
                                        Book Appointment
                                    </Button>
                                </Link> */}
                            </CardContent>
                        </Card>

                     </Grid> 

                </Grid>
               
            </Container>


        </div>
    );
 }
export default UnRegisteredPatients;





// function Dashboard(){
        
// }


