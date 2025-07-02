import React, { useState } from 'react';
import styles from './SignUp.module.css';
import Button from '../../../components/ui/Button/Button';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login data:', formData);
        // Add authentication logic here
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupCard}>
                <h1 className={styles.logo}>Join Socialize</h1>
                <form onSubmit={handleSubmit}>
                    {/* Add name, email, password, confirmPassword fields */}
                    <Button type="submit" fullWidth>Create Account</Button>
                </form>

                <div className={styles.footer}>
                    <p>Already have an account? <a href="/login">Log In</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage