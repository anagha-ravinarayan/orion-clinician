import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Login from "./components/login/login.component";
import ClinicianPortal from './components/clinician-portal/clinician-portal.component';

export default function App() {

  const [sessionToken, setSessionToken] = useState(sessionStorage.getItem("session-token"));

  return (
    <Routes>
      <Route exact path="/" element={<Login setSessionToken={setSessionToken} />} />
      <Route exact path="/my-portal" element={<ClinicianPortal sessionToken={sessionToken} />} />
    </Routes>
  );
}
