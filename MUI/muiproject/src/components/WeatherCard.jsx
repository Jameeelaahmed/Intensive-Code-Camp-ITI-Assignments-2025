import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function WeatherCard({ weather }) {
    const current = weather.current_condition[0];
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{weather.nearest_area[0].areaName[0].value}</Typography>
                <Typography variant="body1">
                    {current.weatherDesc[0].value}
                </Typography>
                <Typography variant="h6">
                    {current.temp_C}°C
                </Typography>
            </CardContent>
        </Card>
    );
}

export default WeatherCard;