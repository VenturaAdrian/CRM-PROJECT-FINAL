import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container, Paper, Typography, Tabs, Tab, Box, Card, CardContent, CardActions, Button
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const CROhome = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch("/allgetRequests");
                if (!response.ok) throw new Error("Failed to fetch requests");
                
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };
        
        fetchRequests();
    }, []);

    // Filter requests based on the selected tab
    const filteredRequests = requests.filter(request => {
        switch (tabIndex) {
            case 0: return request.Status === "Pending";
            case 1: return request.Status === "Reviewed";
            case 2: return request.Status === "Approved";
            case 3: return request.Status === "Rejected";
            default: return [];
        }
    });

    const handleLogout = () => {
        
        navigate('/login'); 
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight="bold">
                        Community Requests
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="error" 
                        startIcon={<LogoutIcon />} 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>

               
                <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} centered>
                    <Tab label="Pending" />
                    <Tab label="Reviewed" />
                    <Tab label="Approved" />
                    <Tab label="Rejected" />
                </Tabs>

              
                <Box sx={{ marginTop: 3, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((request) => (
                            <Card key={request.RequestID} sx={{ width: 300, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {request.Activity}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Name:</strong> {request.UserFirstname} {request.UserLastname}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Community:</strong> {request.CmntyBrngy}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Date:</strong> {new Date(request.DateTime).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Comment:</strong> {request.Comment || "No comment"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        size="small" 
                                        color="primary" 
                                        onClick={() => navigate(`/updateCRO/${request.RequestID}`)}
                                    >
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            No requests found.
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default CROhome;
