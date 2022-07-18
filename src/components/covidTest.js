import React from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/Button";
import { Link, useHistory} from 'react-router-dom'

function CovidTest(){
    return (
        <Form>
            <Col>
                <Form.Group controlId="formGridName">
                    <Form.Label>COVID Questionnaire</Form.Label>
                </Form.Group>
            </Col>
            
            <Form.Label>Have you recieved a COVID vaccine?</Form.Label>
            
            <Col>
            <input type="radio" value="Yes" name="Vaccine" /> Yes
            <input type="radio" value="No" name="Vaccine" /> No
            
            </Col>
            <Col>
                <Form.Label>Do you currently have a fever?</Form.Label>
            </Col>
            
            <Col>
            <input type="radio" value="Yes" name="Fewer" /> Yes
            <input type="radio" value="No" name="Fewer" /> No
            
            </Col>
            <Col>
                <Form.Label>Are you currently having COVID symptoms?</Form.Label>
            </Col>
           
            <Col>
            <input type="radio" value="Yes" name="Symptoms" /> Yes
            <input type="radio" value="No" name="Symptoms" /> No
            
            </Col>
            <Col>
                <Form.Label>Have you gotten sick in the past 24 hours?</Form.Label>
            </Col>
            <Col>
            
            <input type="radio" value="Yes" name="Sick" /> Yes
            <input type="radio" value="No" name="Sick" /> No
           
            </Col>
            <Col>
            <Link to={'/PatientDashboard'}>
                <Button variant="primary">
                    Submit
                </Button>
            </Link>
            </Col>
        </Form>
        )
    
  }
  export default CovidTest;