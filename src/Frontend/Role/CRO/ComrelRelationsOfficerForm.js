import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Paper,
    Typography,
    Select,
    MenuItem,
    TextField,
    Button
} from "@mui/material";

const ComrelRelationsOfficerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [status, setStatus] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                const response = await fetch(`/getRequest/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setRequest(data);
                setStatus(data.Status);
                
            } catch (error) {
                console.error("Error fetching request details:", error);
            }
        };
        fetchRequestDetails();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`/updateRequest/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status, comment}),
            });
            if (!response.ok) {
                throw new Error("Failed to update request");
            }
            alert("Request updated successfully!");
            navigate("/reviewCRO");
        } catch (error) {
            console.error("Error updating request:", error);
        }
    };

    if (!request) return <Typography>No request details found.</Typography>;

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Request Details (ID: {request.RequestID})
                </Typography>
                <Typography><strong>User:</strong> {request.UserFirstname} {request.UserLastname}</Typography>
                <Typography><strong>Community:</strong> {request.CmntyBrngy}</Typography>
                <Typography><strong>Activity:</strong> {request.Activity}</Typography>
                <Typography><strong>Venue:</strong> {request.Venue}</Typography>
                <Typography><strong>Guests:</strong> {request.Guests}</Typography>
                <Typography><strong>COMREL Employees:</strong> {request.ComrelEmp}</Typography>
                <Typography><strong>Beneficiaries:</strong> {request.Beneficiaries}</Typography>
                
                <Typography><strong>Status:</strong></Typography>
                <Select value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Reviewed">Reviewed</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
                
                <Typography><strong>Comment:</strong></Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                
                <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
                    Save
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate("/reviewCRO")} sx={{ mt: 2, ml: 2 }}>
                    Back
                </Button>
            </Paper>
        </Container>
    );
};

export default ComrelRelationsOfficerForm;
