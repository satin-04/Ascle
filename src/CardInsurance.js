import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBRow, MDBCol } from 'mdb-react-ui-kit';


// class CardInsurance extends React.Component {
//     render() {
//       return (
//         <Card sx={{ maxWidth: 345 }}>
//             <CardMedia
//                 component="img"
//                 height="140"
//                 image="Insurance.jpeg"
//                 alt="Insurance"
//             />
//             <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                 Insurance Provider
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
                
//                 </Typography>
//             </CardContent>
//         </Card>
//       )
//     }
// }

// export default CardInsurance;


export default function CardInsurance() {
  return (
    <MDBRow>
      <MDBCol sm='4'>
    <MDBCard style={{ width: '18rem' }} className="shadow-5" >
      <div className="bg-image hover-overlay hover-zoom hover-shadow">
      <img src='Insurance.jpeg'  style={{width:"100%", height: '13rem'}} alt='...' position='top' />
      </div>
      <MDBCardBody>
        <MDBCardTitle>
          <b>Insurance Provider</b>
        </MDBCardTitle>
      </MDBCardBody>
    </MDBCard>
    </MDBCol>
    </MDBRow>
  );
}