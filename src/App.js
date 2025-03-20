import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Frontend/Login"
import Register from "./Frontend/Register"
import Homepage from "./Frontend/Homepage"

import ComrelEncoder from './Frontend/Role/CE/ComrelEncoder';
import ComrelEncoderForm from './Frontend/Role/CE/ComrelEncoderForm';
import ComrelEncoderFormEdit from './Frontend/Role/CE/ComrelEncoderFormEdit';

import CROhome from './Frontend/Role/CRO/CROhome';
import ComrelRelationsOfficerForm from './Frontend/Role/CRO/ComrelRelationsOfficerForm';

import DepartmentHeadComrelIII from './Frontend/Role/DHCR3/DepartmentHeadComrelIII';
import ComrelDepartmentHead from './Frontend/Role/CDH/ComrelDepartmentHead';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />

        <Route path="/homeCE" element={<ComrelEncoder/>} />
        <Route path="/homeCE_form" element={<ComrelEncoderForm/>} />
        <Route path="/editRequest/:id" element={<ComrelEncoderFormEdit/>} />

        <Route path='/reviewCRO' element={<CROhome/>}/>
        <Route path='/updateCRO/:id' element={<ComrelRelationsOfficerForm/>}/>
        
        <Route path='/homeDHC3' element={<DepartmentHeadComrelIII/>}/>
        <Route path='/homeCDH' element={<ComrelDepartmentHead/>}/>
      </Routes>
    </Router>
  );

}

export default App;
