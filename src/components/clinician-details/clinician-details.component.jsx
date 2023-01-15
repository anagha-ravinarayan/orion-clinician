import React, { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const ClinicianDetails = ({ sessionToken }) => {

    useEffect(() => {
        fetchClinicianDetails();
    }, []);

    const [clinician, setClinicianDetails] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const fetchClinicianDetails = async () => {
        const request = {
            name: 'clinician-details',
            method: 'GET',
            headers: {
                'Authorization': sessionToken
            }
        }
        try {
            const response = await fetch('/clinician-details', request);
            const clinicianDetails = await response.json();
            setClinicianDetails({
                title: clinicianDetails.title,
                firstName: clinicianDetails.firstName,
                familyName: clinicianDetails.familyName,
                preferredName: clinicianDetails.preferredName,
                role: clinicianDetails.role,
                username: clinicianDetails.username,
            });
        } catch (exception) {
            console.error("Error while getting Clinician Details: ", exception);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CardContent>
            {isLoading ?
                <Box sx={{ width: '100%', marginTop: '2rem', textAlign: 'center' }}>
                    <CircularProgress sx={{ textAlign: 'center' }} />
                </Box> :
                <>
                    <Typography variant="h5" component="div">
                        {clinician.title} {clinician.firstName} {clinician.familyName}
                    </Typography>
                    <Typography sx={{ fontSize: 14, marginBottom: "1rem" }} color="text.secondary" >
                        {clinician.role}
                    </Typography>
                    <Typography variant="body2">
                        {clinician.preferredName ? `Preferred Name: ${clinician.preferredName}` : ''}
                    </Typography>
                    <Typography variant="body2">
                        Username: {clinician.username}
                    </Typography>
                </>
            }
        </CardContent>
    )
}

export default ClinicianDetails;