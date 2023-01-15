import React, { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import CircularProgress from '@mui/material/CircularProgress';
import Tab from '@mui/material/Tab';

import PatientDetail from "../patient-detail/patient-detail.component";

const Patients = ({ sessionToken }) => {

    useEffect(() => {
        fetchPatients();
    }, []);

    const [patients, setPatients] = useState([]);

    const [tabValue, setTabValue] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const fetchPatients = async () => {
        const request = {
            name: 'patients',
            method: 'GET',
            headers: {
                'Authorization': sessionToken
            }
        }
        try {
            const response = await fetch('/patients', request);
            const data = await response.json();
            setPatients(data.patients);
            setTabValue(data.patients[0].id)
        } catch (exception) {
            console.error("Error while getting Patients: ", exception);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ marginTop: '2rem', borderBottom: 1, borderColor: 'divider' }} centered>
                {isLoading && <CircularProgress />}
                {patients.map(({ id, name }) => {
                    return (
                        <Tab key={id} label={name} value={id} sx={{ width: '100%' }}></Tab>
                    );
                })}
            </Tabs>
            {patients.map(({ id }) => {
                return (
                    (id === tabValue) && (<PatientDetail key={id} id={id} sessionToken={sessionToken} />)
                );
            })}
        </Box>
    )
}

export default Patients;