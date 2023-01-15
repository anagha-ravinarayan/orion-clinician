import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';

import ClinicianDetails from "../clinician-details/clinician-details.component";
import Patients from "../patients/patients.component";

const ClinicianPortal = ({ sessionToken }) => {
    return (
        <Container maxWidth='lg' sx={{ marginTop: "3rem" }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h3" gutterBottom sx={{ marginTop: "3rem", textAlign: 'left', color: '#556cd6' }}>
                        Clinical Portal
                    </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <ClinicianDetails sessionToken={sessionToken} />
                </Grid>
            </Grid>
            <Patients sessionToken={sessionToken} />
        </Container>
    )
}

export default ClinicianPortal;