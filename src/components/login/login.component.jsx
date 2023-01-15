import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Login = ({ setSessionToken }) => {

    const [userCredentials, setUserCredentials] = useState({});

    const { username, password } = userCredentials;

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { value, name } = event.target;
        setUserCredentials({
            ...userCredentials,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const encodedCredentials = btoa(`${username}:${password}`);
        const request = {
            name: 'login',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}`
            }
        }
        try {
            const response = await fetch('/login', request);
            if (response.status == 200) {
                const data = await response.json();
                setSessionToken(data.sessionToken);
                navigate('/my-portal');
            }
        } catch (exception) {
            console.error("Error during Login: ", exception);
        }
    }

    return (
        <Container maxWidth='sm'>
            <Typography variant="h3" gutterBottom sx={{ marginTop: "3rem", textAlign: 'center', color: '#556cd6' }}>
                Clinical Portal Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ width: "100%" }}>
                    <TextField sx={{ width: "100%", marginTop: "2rem" }}
                        required
                        id="standard-required"
                        label="Username"
                        name="username"
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: "100%", marginTop: "2rem" }}
                        required
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        variant="standard"
                        onChange={handleChange}
                    />
                    <Box sx={{ width: "100%", marginTop: "4rem", textAlign: "center" }}>
                        <Button variant="contained" type="submit" sx={{ width: "30%" }}>Login</Button>
                        <Button variant="outlined" sx={{ width: "30%", marginLeft: '1rem' }}>Cancel</Button>
                    </Box>
                </Box>
            </form>
        </Container>
    );

}

export default Login;