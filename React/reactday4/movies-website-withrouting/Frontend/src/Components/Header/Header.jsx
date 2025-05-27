import classes from './Header.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
function Header() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation().pathname;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={classes.header_container}>
            <div className={`${classes.header} ${(scrolled || location !== '/') && classes.change_bg_color}`}>
                <NavLink to="/">
                    <p>Home</p>
                </NavLink>
                <NavLink to="/movies">
                    <p>Movies</p>
                </NavLink>
                <NavLink to='/about'>
                    <p>About</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Header
