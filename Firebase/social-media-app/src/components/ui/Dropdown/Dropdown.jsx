import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({ trigger, children, position = 'right' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div onClick={toggleDropdown} className={styles.trigger}>
                {trigger}
            </div>
            {isOpen && (
                <div className={`${styles.menu} ${styles[position]}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

const DropdownItem = ({ onClick, children, variant = 'default' }) => {
    const handleClick = () => {
        onClick();
    };

    return (
        <div
            className={`${styles.item} ${styles[variant]}`}
            onClick={handleClick}
        >
            {children}
        </div>
    );
};

export { Dropdown, DropdownItem };
