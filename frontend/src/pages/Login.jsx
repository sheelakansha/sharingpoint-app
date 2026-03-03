import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // In a real app, save the token to localStorage here
                // localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.iconContainer}>
                    {/* SVG for a login/arrow icon similar to screenshot */}
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4f46e5' }}>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                        <polyline points="11 16 15 12 11 8"></polyline>
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"></path>
                    </svg>
                </div>

                <h2 style={styles.title}>Welcome Back</h2>
                <p style={styles.subtitle}>Sign in to access your dashboard</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div style={styles.optionsRow}>
                        <label style={styles.checkboxLabel}>
                            <input type="checkbox" style={styles.checkbox} />
                            Remember me
                        </label>
                        <a href="#" style={styles.forgotLink}>Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div style={styles.signupRow}>
                        Don't have an account? <a href="#" style={styles.signupLink}>Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#000000',
        fontFamily: "'Inter', sans-serif"
    },
    card: {
        backgroundColor: '#1c1c1e',
        padding: '2.5rem',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    iconContainer: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: '0.5rem',
        textAlign: 'center'
    },
    subtitle: {
        color: '#9ca3af',
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '0.9rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        width: '100%'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: '500',
        color: '#d1d5db'
    },
    input: {
        padding: '0.875rem',
        borderRadius: '8px',
        backgroundColor: '#2c2c2e',
        border: 'none',
        color: '#ffffff',
        fontSize: '0.95rem',
        outline: 'none',
    },
    optionsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#d1d5db',
        cursor: 'pointer'
    },
    checkbox: {
        accentColor: '#3b82f6',
        cursor: 'pointer'
    },
    forgotLink: {
        color: '#3b82f6',
        textDecoration: 'none',
        fontWeight: '500'
    },
    button: {
        marginTop: '0.5rem',
        padding: '0.875rem',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        width: '100%'
    },
    error: {
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        color: '#ef4444',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        fontSize: '0.875rem',
        textAlign: 'center',
        width: '100%'
    },
    signupRow: {
        marginTop: '1.5rem',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '0.85rem'
    },
    signupLink: {
        color: '#3b82f6',
        textDecoration: 'none',
        fontWeight: '500'
    }
};

export default Login;
