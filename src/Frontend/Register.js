import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    UserID: "",
    Firstname: "",
    Lastname: "",
    UserRole: "",
    Password: "",
  });

  const [errors, setErrors] = useState({
    UserID: "",
    Firstname: "",
    Lastname: "",
    UserRole: "",
    Password: "",
  });

  const validate = () => {
    let valid = true;
    let newErrors = { ...errors };

    // Validate UserID (6 digits)
    if (!/^\d{6}$/.test(user.UserID)) {
      newErrors.UserID = "User ID must be exactly 6 digits.";
      valid = false;
    } else {
      newErrors.UserID = "";
    }

    // Validate First Name (Only letters, no spaces)
    if (!/^[A-Za-z]+$/.test(user.Firstname)) {
      newErrors.Firstname = "First name must contain only letters.";
      valid = false;
    } else {
      newErrors.Firstname = "";
    }

    // Validate Last Name (Only letters, no spaces)
    if (!/^[A-Za-z]+$/.test(user.Lastname)) {
      newErrors.Lastname = "Last name must contain only letters.";
      valid = false;
    } else {
      newErrors.Lastname = "";
    }

    // Validate User Role (Should not be empty)
    if (!user.UserRole) {
      newErrors.UserRole = "Please select a user role.";
      valid = false;
    } else {
      newErrors.UserRole = "";
    }

    // Validate Password (At least 5 characters)
    if (user.Password.length < 5) {
      newErrors.Password = "Password must be at least 5 characters.";
      valid = false;
    } else {
      newErrors.Password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const setInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: name === "UserID" ? value.replace(/\D/g, "").slice(0, 6) : value,
    }));
  };

  const createUser = async () => {
    if (!validate()) return;
  
    try {
      const response = await fetch("/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error("Registration failed");
      }
  
      const newData = await response.json();
      console.log(newData);
  
      alert("Registration successful! Redirecting to login page...");

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>

        {/* User ID */}
        <TextField
          fullWidth
          margin="normal"
          label="User ID"
          type="text"
          name="UserID"
          value={user.UserID}
          onChange={setInput}
          error={!!errors.UserID}
          helperText={errors.UserID}
        />

        {/* First Name */}
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="Firstname"
          value={user.Firstname}
          onChange={setInput}
          error={!!errors.Firstname}
          helperText={errors.Firstname}
        />

        {/* Last Name */}
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="Lastname"
          value={user.Lastname}
          onChange={setInput}
          error={!!errors.Lastname}
          helperText={errors.Lastname}
        />

        {/* User Role Dropdown */}
        <FormControl fullWidth margin="normal" error={!!errors.UserRole}>
          <InputLabel>User Role</InputLabel>
            <Select name="UserRole" value={user.UserRole} onChange={setInput}>
              <MenuItem value="CE">COMREL Encoder</MenuItem>
              <MenuItem value="CRO">COMREL Relations Officer</MenuItem>
              <MenuItem value="DHCR3">Department Head COMREL III</MenuItem>
              <MenuItem value="CDH">COMREL Department Head</MenuItem>
            </Select>
          <FormHelperText>{errors.UserRole}</FormHelperText>
        </FormControl>

        {/* Password */}
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          name="Password"
          value={user.Password}
          onChange={setInput}
          error={!!errors.Password}
          helperText={errors.Password}
        />

        {/* Register Button */}
        <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={createUser}>
          Register
        </Button>

        {/* Login Button */}
        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => navigate("/login")}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Register;