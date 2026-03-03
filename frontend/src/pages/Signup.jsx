import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullName, email, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Optionally save token: localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.iconContainer}>
                    {/* SVG for Add User icon */}
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3b82f6' }}>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <line x1="19" y1="8" x2="19" y2="14"></line>
                        <line x1="22" y1="11" x2="16" y2="11"></line>
                    </svg>
                </div>

                <h2 style={styles.title}>Create Account</h2>
                <p style={styles.subtitle}>Join us and start your journey</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            style={styles.input}
                            placeholder="John Doe"
                            required
                        />
                    </div>

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

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>

                    <div style={styles.signupRow}>
                        Already have an account? <Link to="/login" style={styles.signupLink}>Sign in</Link>
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
        fontFamily: "'Inter', sans-serif",
        padding: '2rem 1rem'
    },
    card: {
        backgroundColor: '#1c1c1e',
        padding: '2.5rem',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '430px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    iconContainer: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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

export default Signup;
