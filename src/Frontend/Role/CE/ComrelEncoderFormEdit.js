import React, { useEffect, useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useNavigate,useParams } from "react-router-dom";
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

const ComrelEncoderFormEdit = () => {
    const { id } = useParams(); // Get Request ID from URL
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [activity, setActivity] = useState("");
  



    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await fetch(`/getRequest/${id}`);
                if (!response.ok) {
                    throw new Error("Error fetching request");
                }
                const data = await response.json();
                setRequest(data);
                setActivity(data.Activity);

                console.log("Fetched request data:", data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchRequest();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequest((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/updateRequestCE/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" 

                },
              
                   
                    body: JSON.stringify({
                        Firstname: request.UserFirstname,
                        Lastname: request.UserLastname,
                        CmntyBrngy: request.CmntyBrngy,
                        Activity: activity,
                        Venue: request.Venue,
                        Guests: request.Guests,
                        ComrelEmp: request.ComrelEmp,
                        Beneficiaries: request.Beneficiaries,
                        Status: request.Status, 
                        DateTime: request.DateTime, 
                        Comment: request.Comment || ""
                    }),
               
                
            });
            
            if (!response.ok) {
                throw new Error("Error updating request");
            }
        
            alert("Request updated successfully!");
            navigate("/homeCE");
        } catch (error) {
            console.error("Update error:", error);
        }
    };

 if (!request) return <Typography>No request details found.</Typography>;
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                <Typography variant="h5">Edit Request ({request.RequestID})</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Request ID" name="RequestID" value={request.RequestID} fullWidth disabled />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField label="Firstname" name="UserFirstname" value={request.UserFirstname} fullWidth onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField label="Lastname" name="UserLastname" value={request.UserLastname} fullWidth onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Community/Barangay" name="CmntyBrngy" value={request.CmntyBrngy} fullWidth onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12}>
                        <Select
                            name="Activity"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
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
                        <TextField label="Venue/Place" name="Venue" value={request.Venue} fullWidth onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Guests" name="Guests" value={request.Guests} fullWidth onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="COMREL Employees" name="ComrelEmp" value={request.ComrelEmp} fullWidth onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Beneficiaries" name="Beneficiaries" value={request.Beneficiaries} fullWidth onChange={handleInputChange} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Select Date and Time:</Typography>
                        <Datetime 
    value={moment(request.DateTime)} 
    onChange={(date) => setRequest(prev => ({ ...prev, DateTime: date.format('YYYY-MM-DD HH:mm:ss') }))} 
/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Status" name="Status" value={'Pending'} fullWidth disabled />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Comment" name="Comment" value={request.Comment} fullWidth disabled />
                    </Grid>

                    

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ComrelEncoderFormEdit;
