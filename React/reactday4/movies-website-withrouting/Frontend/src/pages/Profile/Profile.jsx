import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Avatar, Grid, Card, CardContent } from "@mui/material";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            fetch(`http://localhost:3000/users?email=${encodeURIComponent(userEmail)}`)
                .then(res => res.json())
                .then(async data => {
                    const userData = data[0];
                    setUser(userData);
                    const moviesRes = await fetch("http://localhost:3000/movies");
                    const allMovies = await moviesRes.json();
                    if (userData && userData.favorites && userData.favorites.length > 0) {
                        const favMovies = allMovies.filter(movie => userData.favorites.includes(movie.id));
                        setFavoriteMovies(favMovies);
                        console.log(favMovies);

                    } else {
                        setFavoriteMovies([]);
                    }
                })
                .catch(() => {
                    setUser(null);
                    setFavoriteMovies([]);
                });
        }
    }, []);

    if (!user) {
        return (
            <Box sx={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h6">Loading user data...</Typography>
            </Box>
        );
    }

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
                elevation={8}
                sx={{
                    p: 5,
                    minWidth: 350,
                    background: "rgba(255,255,255,0.20)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 600,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                    <Avatar sx={{ bgcolor: "#ff6347", width: 80, height: 80, mb: 2 }}>
                        {user.name ? user.name[0].toUpperCase() : "U"}
                    </Avatar>
                    <Typography variant="h5" sx={{ color: "rgba(1, 58, 99, 1)", fontWeight: "bold" }}>
                        {user.name}
                    </Typography>
                </Box>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#ff6347" }}>
                            Email:
                        </Typography>
                        <Typography variant="body1">{user.email}</Typography>
                    </Grid>
                </Grid>
                <Typography variant="h6" sx={{ color: "#ff6347", mb: 2 }}>
                    Favorite Movies:
                </Typography>
                {favoriteMovies.length === 0 ? (
                    <Typography>No favorite movies yet.</Typography>
                ) : (
                    <Grid container spacing={2}>
                        {favoriteMovies.map(movie => (
                            <Grid item xs={12} sm={6} key={movie.id}>
                                <Card sx={{ background: "rgba(255,255,255,0.7)" }}>
                                    <CardContent>
                                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            Rating: {movie.rating}
                                        </Typography>
                                        <Typography variant="body2">
                                            {movie.overview}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Paper>
        </Box>
    );
}
