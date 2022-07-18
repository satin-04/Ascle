import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';

// export default function CardDoctor() {
//   return (
//     <MDBRipple
//       className='bg-image hover-overlay shadow-1-strong rounded'
//       style={{ maxWidth: 100 }}
//       rippleTag='div'
//       rippleColor='light'
//     >
//       <img src='doctorlogo.png' className='w-100' style={{width:"300%"}} />
//       <a href='#!'>
//         <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
//       </a>
//     </MDBRipple>
//   );
// }

// class CardDoctor extends React.Component {
//   render() {
//     return (
//       <Card sx={{ maxWidth: 345 }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image="doctorlogo.png"
//         alt="Doctor"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Doctor
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
          
//         </Typography>
//       </CardContent>
//     </Card>
//     )
//   }

// }
// export default CardDoctor;

export default function CardDoctor() {
  return (
    <MDBRow>
      <MDBCol sm='4'>
    <MDBCard style={{ width: '18rem' }} className="shadow-5" >
      <div className="bg-image hover-overlay hover-zoom hover-shadow">
      <img src='doctorlogo.png'  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
      </div>
      <MDBCardBody>
        <MDBCardTitle>
          <b>Doctor</b>
        </MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
    </MDBCol>
    </MDBRow>
  );
}
