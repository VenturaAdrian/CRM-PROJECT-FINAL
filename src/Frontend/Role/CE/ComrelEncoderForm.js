import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
    Container,
    Paper,
    Grid,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography
} from "@mui/material";

const ComrelEncoderForm = () => {
    const navigate = useNavigate();
    const generateRequestID = () => Math.floor(1000 + Math.random() * 9000);

    const [request, setRequest] = useState({
        RequestID: generateRequestID(),
        UserFirstname: "",
        UserLastname: "",
        CmntyBrngy: "",
        Activity: "",
        Venue: "",
        Guests: "",
        ComrelEmp: "",
        Beneficiaries: "",
        Status: "Pending",
        Comment: "none",
        DateTime: moment().format("YYYY-MM-DD HH:mm:ss")
    });

    const setInput = (e) => {
        const { name, value } = e.target;

        
        setRequest((prevState) => ({
            ...prevState,
            [name]: name === "UserFirstname" || name === "UserLastname" ? value.replace(/\s+/g, "") : value
        }));
    };

    const setDateTime = (date) => {
        setRequest((prevState) => ({
            ...prevState,
            DateTime: moment(date).format("YYYY-MM-DD HH:mm:ss")
        }));
    };

    const createRequest = async () => {
        
        const newRequest = await fetch("/createRequest", {
           
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(request)
        }).then((res) => res.json());

        alert(`Added successful for ${request.RequestID}!`);
        navigate("/homeCE");
        console.log(newRequest);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Community Request Form
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Request ID"
                            name="RequestID"
                            value={request.RequestID}
                            fullWidth
                            disabled
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Firstname"
                            name="UserFirstname"
                            onChange={setInput}
                            value={request.UserFirstname}
                            fullWidth
                            
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Lastname"
                            name="UserLastname"
                            onChange={setInput}
                            value={request.UserLastname}
                            fullWidth
                            
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Community/Barangay"
                            name="CmntyBrngy"
                            onChange={setInput}
                            value={request.CmntyBrngy}
                            fullWidth
                            
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Select
                            name="Activity"
                            value={request.Activity}
                            onChange={setInput}
                            displayEmpty
                            fullWidth
                            
                        >
                            <MenuItem value="">Select Community Activity</MenuItem>
                            <MenuItem value="Medical Mission">Medical Mission</MenuItem>
                            <MenuItem value="Reach Out">Reach Out</MenuItem>
                            <MenuItem value="Feeding Program">Feeding Program</MenuItem>
                            <MenuItem value="Rescue">Rescue</MenuItem>
                            <MenuItem value="Rehabilitation">Rehabilitation</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Venue/Place"
                            name="Venue"
                            onChange={setInput}
                            value={request.Venue}
                            fullWidth
                            
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Guests and People"
                            name="Guests"
                            onChange={setInput}
                            value={request.Guests}
                            fullWidth
                            
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="COMREL Employees Involved"
                            name="ComrelEmp"
                            onChange={setInput}
                            value={request.ComrelEmp}
                            fullWidth
                            
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Beneficiaries"
                            name="Beneficiaries"
                            onChange={setInput}
                            value={request.Beneficiaries}
                            fullWidth
                            
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Status"
                            name="Status"
                            value={request.Status}
                            fullWidth
                            disabled
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Select Date and Time:</Typography>
                        <Datetime value={moment(request.DateTime)} onChange={setDateTime} />
                    </Grid>
                    


                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth onClick={createRequest}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ComrelEncoderForm;
