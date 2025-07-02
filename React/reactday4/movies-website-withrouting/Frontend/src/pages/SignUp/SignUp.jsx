import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import classes from './SignUp.module.css'

export default function SignUp() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const textFieldSx = {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                border: "solid 5px rgba(1, 58, 99, 1) "
            },
            "&:hover fieldset": {
                border: "solid 5px rgba(1, 58, 99, 1) "
            },
            "&.Mui-focused fieldset": {
                border: "solid 5px rgba(1, 58, 99, 1) "
            },
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        setSuccess("");
        try {
            const checkRes = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(form.email)}`);
            const existingUsers = await checkRes.json();
            if (existingUsers.length > 0) {
                setError("This email is already registered. Please use a different email or login.");
                return;
            }

            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });
            if (res.ok) {
                setSuccess("Signed up successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                setError("Failed to sign up.");
            }
        } catch (err) {
            setError("Failed to sign up.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(150deg,rgba(1, 58, 99, 1) 0%,rgba(2, 95, 119, 1) 47%,rgba(2, 128, 144, 1) 66%,rgba(0, 120, 120, 1) 85%,rgba(0, 100, 90, 1) 100%)"
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    minWidth: 350,
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 4,
                }}
                className={classes.signUp}
            >
                <Typography variant="h4" align="center" style={{ color: "rgba(1, 58, 99, 1)", fontWeight: "bold" }} gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={textFieldSx}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={textFieldSx}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={textFieldSx}
                        required
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={textFieldSx}
                        required
                    />
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography color="success.main" sx={{ mt: 1 }}>
                            {success}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: "#ff6347", "&:hover": { backgroundColor: "#e5533d" } }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Typography align="center" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/login" sx={{ color: "#ff6347", fontWeight: "bold" }}>
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Box >
    );
}