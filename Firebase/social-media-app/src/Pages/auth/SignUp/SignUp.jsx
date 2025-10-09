import React, { useState, useEffect } from 'react';
import styles from './SignUp.module.css';
import Button from '../../../components/ui/Button/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { signup } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let strength = 0;
        if (formData.password.length >= 8) strength += 1;
        if (/[A-Z]/.test(formData.password)) strength += 1;
        if (/[0-9]/.test(formData.password)) strength += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) strength += 1;
        setPasswordStrength(strength);
    }, [formData.password]);

    useEffect(() => {
        setPasswordsMatch(
            formData.password === formData.confirmPassword ||
            formData.confirmPassword === ''
        );
    }, [formData.password, formData.confirmPassword]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!termsAccepted) {
            setError("Please accept the terms and conditions");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setPasswordsMatch(false);
            return;
        }

        setIsSubmitting(true);

        try {
            await signup(formData.email, formData.password, formData.name);
            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.message || 'Failed to create account. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStrengthColor = (strength) => {
        if (strength === 0) return 'transparent';
        if (strength <= 1) return '#ff4d4d';
        if (strength <= 2) return '#ffa64d';
        if (strength <= 3) return '#ffd24d';
        return '#5cdd5c';
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupCard}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>Socialize</div>
                    <p className={styles.tagline}>Join our community</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label htmlFor="name">Full Name</label>
                        <span className={styles.inputIcon}>👤</span>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <span className={styles.inputIcon}>✉️</span>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder=" "
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <span className={styles.inputIcon}>🔒</span>

                        {/* Password strength meter */}
                        <div className={styles.strengthMeter}>
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={styles.strengthBar}
                                    style={{
                                        backgroundColor: level <= passwordStrength
                                            ? getStrengthColor(passwordStrength)
                                            : '#e1e5eb'
                                    }}
                                />
                            ))}
                        </div>

                        <div className={styles.strengthText}>
                            {passwordStrength === 0 && ''}
                            {passwordStrength === 1 && 'Weak password'}
                            {passwordStrength === 2 && 'Medium password'}
                            {passwordStrength === 3 && 'Good password'}
                            {passwordStrength === 4 && 'Strong password!'}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            className={!passwordsMatch ? styles.errorInput : ''}
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <span className={styles.inputIcon}>🔒</span>

                        {!passwordsMatch && (
                            <div className={styles.errorMessage}>
                                Passwords do not match
                            </div>
                        )}
                    </div>

                    <div className={styles.termsContainer}>
                        <label className={styles.terms}>
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={() => setTermsAccepted(!termsAccepted)}
                            />
                            <span>I agree to the <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a></span>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className={styles.spinner}></span>
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>Already have an account? <NavLink to="/auth/login">Log In</NavLink></p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;