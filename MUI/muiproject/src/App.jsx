import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import WeatherDetails from './components/WeatherDetails';
import ThemeSwitcher from './components/ThemeSwitcher';
import { getWeather } from './services/weatherApi';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError('City not found. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('London');
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f7ff',
        paper: darkMode ? 'rgba(33, 33, 33, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.5px',
      },
      subtitle1: {
        fontWeight: 500,
        opacity: 0.8,
      },
    },
    shape: {
      borderRadius: 16,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode
            ? 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
            : 'linear-gradient(135deg, #4da0ff, #d39ef8, #ffffff)',
          backgroundAttachment: 'fixed',
          padding: { xs: 2, sm: 3 },
          py: 4,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" component="h1">
                Weather Dashboard
              </Typography>
              <Typography variant="subtitle1">
                Real-time weather updates
              </Typography>
            </motion.div>
            <ThemeSwitcher
              darkMode={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
            />
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchBar onSearch={handleSearch} loading={loading} />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="error-message"
              sx={{ mt: 2 }}
            >
              {error}
            </motion.div>
          )}

          {weather && (
            <Fade in={true} timeout={800}>
              <Box sx={{ mt: 4 }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 3,
                    mb: 4,
                  }}
                >
                  <WeatherCard weather={weather} />
                  <WeatherDetails weather={weather} />
                </Box>

                <Forecast weather={weather} />
              </Box>
            </Fade>
          )}

          {!weather && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              sx={{
                mt: 10,
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              <Typography variant="h6">
                Search for a city to view weather data
              </Typography>
            </motion.div>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;