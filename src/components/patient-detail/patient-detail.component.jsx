import React, { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const PatientDetail = ({ id, sessionToken }) => {

    useEffect(() => {
        fetchPatientDetails();
    }, []);

    const [isLoading, setIsLoading] = useState(true);

    const [patientDetails, setPatientDetails] = useState({});

    const fetchPatientDetails = async () => {
        if (!patientDetails[id]) {
            const request = {
                name: 'patient-details',
                method: 'GET',
                headers: {
                    'Authorization': sessionToken
                }
            }
            try {
                const response = await fetch(`/patient-details/${id}`, request);
                const newPatientDetail = await response.json();
                setPatientDetails({
                    ...patientDetails,
                    [id]: newPatientDetail
                });
            } catch (exception) {
                console.error("Error while getting Patient details: ", exception);
            } finally {
                setIsLoading(false);
            }
        }
    }

    const currentPatient = patientDetails[id];

    return (
        <CardContent>
            {isLoading &&
                <Box sx={{ width: '100%', marginTop: '2rem', textAlign: 'center' }}>
                    <CircularProgress sx={{ textAlign: 'center' }} />
                </Box>}
            {currentPatient &&
                <Box sx={{ width: '100%', marginTop: '2rem', textAlign: 'center' }}>
                    <Typography variant="h5" component="div">
                        {currentPatient.firstName} {currentPatient.familyName} {currentPatient.suffix}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: '1rem' }}>
                        {currentPatient.preferredName ? `Preferred Name: ${currentPatient.preferredName}` : ''}
                    </Typography>
                    <Typography variant="body2">
                        {currentPatient.age ? `Age: ${currentPatient.age}` : ''}
                    </Typography>
                    <Typography variant="body2">
                        {currentPatient.sex ? `Sex: ${currentPatient.sex}` : ''}
                    </Typography>
                </Box>
            }
        </CardContent>
    )
}

export default PatientDetail;