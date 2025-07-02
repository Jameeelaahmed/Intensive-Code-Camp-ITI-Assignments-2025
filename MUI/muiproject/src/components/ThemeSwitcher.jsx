import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function ThemeSwitcher({ darkMode, onToggle }) {
    return (
        <FormControlLabel
            control={<Switch checked={darkMode} onChange={onToggle} />}
            label="Dark Mode"
        />
    );
}

export default ThemeSwitcher;