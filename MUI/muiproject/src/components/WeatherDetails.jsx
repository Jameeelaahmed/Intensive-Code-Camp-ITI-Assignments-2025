import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function WeatherDetails({ weather }) {
  if (!weather.current_condition) return null;
  const current = weather.current_condition[0];
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6">Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">Humidity: {current.humidity}%</Typography>
            <Typography variant="body2">Wind: {current.windspeedKmph} km/h</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Pressure: {current.pressure} hPa</Typography>
            <Typography variant="body2">Feels Like: {current.FeelsLikeC}°C</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default WeatherDetails;