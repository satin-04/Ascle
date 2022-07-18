import React, {useRef, useState, useEffect} from 'react';
import Navbar from '../navbar.js'
import Grid from '@material-ui/core/Grid';
import { render } from '@testing-library/react';
import { Container, Typography } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './bookAppointment.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import Button from "react-bootstrap/Button";
import Alert from '@mui/material/Alert';
import axios from 'axios';
import AlertTitle from '@material-ui/lab/AlertTitle';
import {useNavigate} from 'react-router-dom'
import { Link} from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';



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


// function BookAppointment() {
//     const classes = useStyles();
//     const [currentDate, setCurrentDate] = useState(new Date());
//     return (
//         <div>

//             <Navbar />

//             <Container>

//                 <Grid container spacing={2}>
//                     <Grid item xs={12} md={5}>
//                     <Typography gutterBottom variant="h5" component="div" style={{paddingTop:'20px'}}>
//                             Doctor Name
//                         </Typography>
//                         <div className={classes.root}>
//                             <Avatar alt="Remy Sharp" src="doctorlogo.png" className={classes.large}/>
//                         </div>
//                     </Grid>
//                     <Grid item xs={12} md={7}>
//                         <Typography gutterBottom variant="h5" component="div" style={{paddingTop:'20px'}}>
//                             Biblography
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" component="div">
//                             Text
//                         </Typography>
//                     </Grid>

//                 </Grid>

//                 <div>
//             <DatePicker showTimeInput
//                 className='inputStyles'
//                 timeFormat="HH:mm:ss"
//                 timeIntervals={15}
//                 timeCaption="time"
//                 showTimeSelect selected={currentDate} onChange={date => setCurrentDate(date)} />

//         </div>


//             </Container>

//         </div>
//     )
// }


const BookAppointment = () => {
  //var alertApp = false;
  const [alertApp, setAlert] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [doctors, setDoctors] = useState([]);
    const param=useParams();
    const param1 = param.doctorId;
    var docName = '';
    var docs = [];
    console.log(param1);
    for(var i=0;i<doctors.length;i++){
      if(param1 == doctors[i].userId){
        docName = doctors[i].firstName + ' ' + doctors[i].lastName;
        docs = doctors[i];
      }
    }
    console.log(docs);



  useEffect(() => {
      fetchDoctors();
    }, []);

const fetchDoctors = () => {
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
    console.log(doctors);

    async function SaveAppointment(){
        const accessToken = localStorage.getItem('tokenPat');
      //  var datum = Date.parse(currentDate); 
      //   var date1 = datum/1000;
        // console.log(date1);
            let item = {
                "date": currentDate.toISOString()
            }
            // console.log(accessToken);
             let res = await fetch("http://20.92.228.100:8080/api/appointments/create-appointment/"+`${param1}`,{
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
            })
            // console.log(res);
        
      }
      const classes = useStyles();

    return (
      <div>

      <Navbar />

      <Container>

          <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
              <Typography gutterBottom variant="h5" component="div" style={{paddingTop:'20px'}}>
              {docName}
                  </Typography>
                  <div >
                      <Avatar alt="Remy Sharp" src="doctorlogo.png" />
                  </div>
              </Grid>
              <Grid item xs={12} md={7}>
                  <Typography gutterBottom variant="h5" component="div" style={{paddingTop:'20px'}}>
                      Biography
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="div">
                  {docs.description}
                  </Typography>
              </Grid>

          </Grid>

          <div>
      <DatePicker showTimeInput
          className='inputStyles'
          timeFormat="HH:mm:ss"
          timeIntervals={15}
          timeCaption="time"
          showTimeSelect selected={currentDate} onChange={date => setCurrentDate(date)} />

  </div>
  <Button variant="primary" onClick= {SaveAppointment} >
            Save Appointment
        </Button>
       
       { alertApp && <Alert severity="success">Your Appointment has been successfully booked!</Alert>}
      </Container>

  </div>
    );
};
export default BookAppointment;