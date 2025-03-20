
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import "../App.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ UserID: "", Password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = async () => {
    try {
      const response = await fetch("/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        const newData = await fetch("/allusers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name: credentials.UserID }),
        }).then((res) => res.json());

        console.log(newData);

        alert(`Login successful for ${credentials.UserID}! Redirecting to homepage...`);

        navigate("/home", {
          state: { userID: newData[0].UserID, userRole: newData[0].UserRole },
        });
      } else {
        setError("Invalid UserID or Password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f4f4"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 300, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="UserID"
          name="UserID"
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="Password"
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
          onClick={loginUser}>
          Login
        </Button>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 2, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
          onClick={() => navigate("/register")} >
          Register
        </Button>

      </Paper>
    </Box>
  );
};

export default Login;
