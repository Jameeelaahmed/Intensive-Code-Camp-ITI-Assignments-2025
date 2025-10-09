import { useState } from 'react';
import styles from './Login.module.css';
import Button from '../../../components/ui/Button/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Failed to log in. Please check your credentials.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>Socialize</div>
                    <p className={styles.tagline}>Connect with friends and the world</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

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
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className={styles.spinner}></span>
                        ) : (
                            'Log In'
                        )}
                    </Button>

                </form>

                <div className={styles.footer}>
                    <p>Don't have an account? <NavLink to="/auth/signup">Sign Up</NavLink></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;