import React from 'react'
import './home.css'
import Navbar from './navbar.js'
import { useNavigate } from "react-router-dom";
import { Card, Button, Alert } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useHistory } from 'react-router-dom'

// function Home(){
//     let history = useNavigate()
//     return (
//         <>
//             <Navbar />
//             <div className='body-home'>
//                 <h1>Welcome to Ascle</h1>
//             </div>
            

        {/* <Form style>
			    		
        <Card className="text-center" style={{ width: '18rem' }}>
        <Card.Body>

            <div className="text-center m-5-auto">

                <div className="col s12" style={{backgroundColor: '#0096FF',borderRadius: '80px',textAlign: 'center',fontFamily: 'Helvetica' }}>
                    <h5>Sign Up</h5>
                </div>

                <Row>
                <label>First Name</label>
                <input id="first_name" type="text"/>
                </Row>

                  <label>Last Name</label>
                  <input id="last_name" type="text"/>
                  
               

            
                <div className="input-field col s12">
                  <label>Email</label>
                  <input id="email" type="email"/>
                 
                </div>
            

                <div className="input-field col s12">
                  <label>Password</label>
                  <input id="password" type="password"/>
                 
                </div>

                <div className="col s12">
                    <button className="waves-effect waves-light btn">Sign Up</button>
                </div>

            </div>
            </Card.Body>
        </Card>

    </Form>
     */}
//    </>
//     )
// }

class Home extends React.Component{
    render() {
        return (
            <div className="row">
                <Navbar/>
                <div className='body-home'>
                 <h1>Sign Up Patient</h1>
                </div>
                <div className="col-md-3 center">
                    <form>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" placeholder="Last Name" />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <button style={{ marginLeft: '100px' }} className="btn btn-success">Submit</button>
                        <h5 style={{ marginLeft: '20px' }} >   Already have an account?  {" "}<Link to = "/Login">Login</Link></h5>
                    </form>
                    
                </div>
            </div>
        );
    }
}


export default Home
