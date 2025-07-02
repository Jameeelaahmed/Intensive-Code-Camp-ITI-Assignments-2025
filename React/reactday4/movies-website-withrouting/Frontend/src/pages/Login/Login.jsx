import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(form.email)}&password=${encodeURIComponent(form.password)}`);
            const users = await res.json();
            if (users.length > 0) {
                localStorage.setItem("userEmail", form.email);
                navigate("/");
            } else {
                setError("Invalid email or password.");
            }
        } catch (err) {
            setError("Failed to login. Please try again.");
        }
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

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(150deg, rgba(1, 58, 99, 1) 0%, rgba(2, 95, 119, 1) 47%, rgba(2, 128, 144, 1) 66%, rgba(0, 120, 120, 1) 85%, rgba(0, 100, 90, 1) 100%)",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "radial-gradient(circle at center, transparent 40%, rgba(1, 58, 99, 0.9) 100%)",
                    zIndex: 0
                }
            }}
        >


            {/* Animated Golden Sparkles */}
            {[...Array(30)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        background: "#ffd700",
                        borderRadius: "50%",
                        boxShadow: "0 0 10px 3px #ffd700",
                        animation: `sparkle ${3 + Math.random() * 5}s infinite ${i * 0.2}s`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        "@keyframes sparkle": {
                            "0%": { opacity: 0, transform: "scale(0)" },
                            "50%": { opacity: 1, transform: "scale(1.5)" },
                            "100%": { opacity: 0, transform: "scale(0)" }
                        }
                    }}
                />
            ))}

            {/* Floating Magical Bubbles */}
            {[...Array(15)].map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        position: "absolute",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(173,216,230,0.4) 70%, transparent 100%)",
                        animation: `float ${15 + i % 5}s infinite ease-in-out`,
                        animationDelay: `${i * 0.5}s`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 40 + 10}px`,
                        height: `${Math.random() * 40 + 10}px`,
                        filter: "blur(3px)",
                        opacity: 0.6,
                        "@keyframes float": {
                            "0%, 100%": { transform: "translateY(0) translateX(0)" },
                            "25%": { transform: `translateY(${-20 - Math.random() * 30}px) translateX(${10 + Math.random() * 20}px)` },
                            "50%": { transform: `translateY(${-40 - Math.random() * 50}px) translateX(${-10 - Math.random() * 20}px)` },
                            "75%": { transform: `translateY(${-20 - Math.random() * 30}px) translateX(${10 + Math.random() * 20}px)` }
                        }
                    }}
                />
            ))}

            {/* Subtle Castle Silhouette */}
            <Box sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "600px",
                height: "150px",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 150'%3E%3Cpath fill='rgba(1,58,99,0.5)' d='M0,150 L800,150 L800,120 C750,120 725,90 700,90 C675,90 650,120 600,120 C550,120 525,90 500,90 C475,90 450,120 400,120 C350,120 325,90 300,90 C275,90 250,120 200,120 C150,120 125,90 100,90 C75,90 50,120 0,120 L0,150 Z'/%3E%3C/svg%3E")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
                zIndex: 1
            }} />

            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    minWidth: 350,
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 4,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px 0 rgba(1, 58, 99, 0.4)",
                    position: "relative",
                    zIndex: 2
                }}
            >
                {/* Your existing form code */}
                <Typography variant="h4" align="center" style={{
                    color: "#ffd700",
                    fontWeight: "bold",
                    textShadow: "0 0 8px rgba(1, 58, 99, 0.8)"
                }} gutterBottom>
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
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
                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: "#ff6347", "&:hover": { backgroundColor: "#e5533d" } }}
                    >
                        Login
                    </Button>
                </form>
                <Typography align="center" sx={{ mt: 2 }}>
                    Don't have an account?{" "}
                    <Link component={RouterLink} to="/sign" sx={{ color: "#ff6347", fontWeight: "bold" }}>
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Box >
    );
}
