import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Container, Paper, Typography, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Button, Box 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

const ComrelEncoder = () => {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch("/allgetRequests");
            const data = await response.json();
            setRequests(data);
        };

        fetchRequests();
    }, []);

    const handleLogout = () => {
       
        navigate('/login'); 
    };

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5">
                        All Community Requests
                    </Typography>
                    <Box>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<AddIcon />} 
                            onClick={() => navigate('/homeCE_form')}
                            sx={{ marginRight: 1 }}
                        >
                            Add
                        </Button>
                        <Button 
                            variant="contained" 
                            color="error" 
                            startIcon={<LogoutIcon />} 
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Action</TableCell>
                                <TableCell>Request ID</TableCell>
                                <TableCell>User Name</TableCell>
                                <TableCell>Community/Barangay</TableCell>
                                <TableCell>Activity</TableCell>
                                <TableCell>Venue</TableCell>
                                <TableCell>Guests</TableCell>
                                <TableCell>COMREL Employees</TableCell>  
                                <TableCell>Beneficiaries</TableCell>  
                                <TableCell>Status</TableCell>                           
                                <TableCell>DateTime</TableCell>
                                <TableCell>Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.length > 0 ? (
                                requests.map((request) => (
                                    <TableRow key={request.RequestID}>
                                        <TableCell>
                                            {request.Status === "Reviewed" && (
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => navigate(`/editRequest/${request.RequestID}`)}
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                        </TableCell>
                                        <TableCell>{request.RequestID}</TableCell>
                                        <TableCell>{request.UserFirstname} {request.UserLastname}</TableCell>
                                        <TableCell>{request.CmntyBrngy}</TableCell>
                                        <TableCell>{request.Activity}</TableCell>
                                        <TableCell>{request.Venue}</TableCell>
                                        <TableCell>{request.Guests}</TableCell>
                                        <TableCell>{request.ComrelEmp}</TableCell>
                                        <TableCell>{request.Beneficiaries}</TableCell>
                                        <TableCell>{request.Status}</TableCell>
                                        <TableCell>{request.DateTime}</TableCell>
                                        <TableCell>{request.Comment}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={12} align="center">
                                        No requests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default ComrelEncoder;
