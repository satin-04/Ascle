import React, {useState, useEffect} from 'react'
import Navbar from './navbar.js'
import { Link} from 'react-router-dom'

export default function Payment(){

        return (
            <div className="row">
                <Navbar/>
                <div className='body-home'>
                 <h1>Payment Portal</h1>
                </div>
                <div className="col-md-3 center">
                    <form>

                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="text" name="cardNumber" placeholder="First Name" />
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="Name" />
                        </div>

                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input type="text" name="expdate" placeholder="ExpDate" />
                        </div>

                        <div className="form-group">
                            <label>CVC</label>
                            <input type="text" name="cvc" placeholder="CVC" />
                        </div>

                        

                        <Link to = "/PatientDashboard"><button type= 'submit' style={{ marginLeft: '100px' }} className="btn btn-success">Submit</button> </Link>
                    </form>
                    
                </div>
            </div>
        );
    }
