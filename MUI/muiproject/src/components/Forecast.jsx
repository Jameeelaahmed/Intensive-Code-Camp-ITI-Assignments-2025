import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Forecast({ weather }) {
  if (!weather.weather) return null;
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {weather.weather.slice(0, 3).map((day, idx) => (
        <Grid item xs={4} key={idx}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">
                {day.date}
              </Typography>
              <Typography variant="body2">
                {day.hourly[4].weatherDesc[0].value}
              </Typography>
              <Typography variant="h6">
                {day.maxtempC}°C / {day.mintempC}°C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Forecast;