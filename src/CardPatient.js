import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';

// class CardPatient extends React.Component {
//     render() {
//       return (
//         <Card sx={{ maxWidth: 345 }}>
//             <CardMedia
//                 component="img"
//                 height="140"
//                 image="Patient.png"
//                 alt="Patient"
//             />
//             <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                 Patient
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
                
//                 </Typography>
//             </CardContent>
//         </Card>
//       )
//     }
// }

// export default CardPatient

export default function CardPatient() {
  return (
    <MDBRow>
      <MDBCol sm='4'>
    <MDBCard style={{ width: '18rem' }} className="shadow-5" >
      <div className="bg-image hover-overlay hover-zoom hover-shadow ">
      <img src='Patient.png'  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
      </div>
      <MDBCardBody>
        <MDBCardTitle>
          <b>Patient</b>
        </MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
    </MDBCol>
    </MDBRow>
  );
}
