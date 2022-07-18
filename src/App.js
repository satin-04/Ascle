import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import LoginPatient from './components/LoginPatient';
import LoginDoctor from './components/LoginDoctor';
import LoginInsurance from './components/LoginInsurance';
import PatientProfile from './components/PatientProfile';
import DoctorProfile from './components/DoctorProfile';
import InsuranceProfile from './components/InsuranceProfile';
import LandingPage from './landingPage';
import SignUpDoctor from './SignUpDoctor';
import SignUpPatient from './SignUpPatient';
import SignUpInsurance from './SignUpInsurance';
import Payment from './Payment';
import Maps from './Maps';
import FetchAppt from './components/PatientAppt';

import CovidTest from './components/covidTest';

import FeaturedDoctors from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import UnRegisteredPatients from './components/UnRegisteredPatients';
import RegisteredPatients from './components/RegisteredPatients';
import InsuranceDashboard from './components/InsuranceDashboard';

import BookAppointment from './components/bookAppointment';
import DoctorViewProfile from './components/doctorViewProfile';
import Chat from './components/Chat/Chat';
import InsurancePackage from './components/insurancePackage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} /> 
          <Route exact path="/SignUpDoctor" element={<SignUpDoctor />} />
          <Route exact path="/SignUpPatient" element={<SignUpPatient />} />
          <Route exact path="/SignUpInsurance" element={<SignUpInsurance />} />
          <Route exact path="/LoginPatient" element={<LoginPatient />} />
          <Route exact path="/LoginDoctor" element={<LoginDoctor />} />
          <Route exact path="/LoginInsurance" element={<LoginInsurance />} />
          <Route exact path="/PatientProfile" element={<PatientProfile />} />
          <Route exact path="/Payment" element={<Payment />} />
          <Route exact path="/:userId/Maps" element={<Maps />} />
          <Route exact path="/:userId/PatientDashboard/:userId/Appt" element={<FetchAppt />} />
         
          
          <Route exact path="/covidTest" element={<CovidTest />} />
          <Route exact path="/DoctorProfile" element={<DoctorProfile />} />
          <Route exact path="/InsuranceProfile" element={<InsuranceProfile />} />

          <Route exact path="/:userId/PatientDashboard" element={<FeaturedDoctors />} />
          <Route exact path="/:userId/DoctorDashboard" element={<DoctorDashboard />} />
          <Route exact path="/InsuranceDashboard" element={<InsuranceDashboard />} />

          <Route exact path="/:doctorId/bookAppointment" element={<BookAppointment />} />
          <Route exact path="/UnRegisteredPatients" element={<UnRegisteredPatients />} />
          <Route exact path="/RegisteredPatients" element={<RegisteredPatients />} />
          <Route exact path="/doctorViewProfile" element={<DoctorViewProfile />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/:userId/PatientDashboard/:userId/insurancePackage" element={<InsurancePackage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;