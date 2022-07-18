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

const RegisteredPatients = () => {
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

                <Container style={{marginTop:"30px"}} alignItems="center" justifyContent="center">

                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={6}> 
                        <Link to = "/UnRegisteredPatients">  
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="doctorlogo.png"
                                    alt="Patient"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Default Package
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={6} spacing={2} alignItems="center" justifyContent="center"> 
                        <Link to = "/UnRegisteredPatients">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="doctorlogo.png"
                                    alt="Patient"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Premium Package
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>

                </Container>


        </div>
    );
 }
export default RegisteredPatients;





// function Dashboard(){
        
// }


