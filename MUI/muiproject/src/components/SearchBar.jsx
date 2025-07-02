import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) onSearch(city);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        variant="outlined"
        size="small"
      />
      <Button type="submit" variant="contained">Search</Button>
    </Box>
  );
}

export default SearchBar;