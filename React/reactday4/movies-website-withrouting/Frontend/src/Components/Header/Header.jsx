import classes from './Header.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as FaIcons from 'react-icons/fa6';
function Header() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation().pathname;
    const totalMovie = useSelector(state => state.movie.totalMovies);
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
                <Link to='sign' className={classes.sign}>
                    <div className={classes.favPart}>
                        <p>Sign Up / Login</p>
                    </div>
                </Link>
                <Link to="/">
                    <p>Home</p>
                </Link>
                <Link to="/movies">
                    <p>Movies</p>
                </Link>
                <Link to='/about'>
                    <p>About</p>
                </Link>
                <Link to='/favouritsPage' className={classes.fav}>
                    <div className={classes.favPart}>
                        <FaIcons.FaHeart />
                        <p>({totalMovie})</p>
                    </div>
                    <div className={classes.favPart}>
                        <Link to='/profile'>
                            <FaIcons.FaUser />
                        </Link>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
