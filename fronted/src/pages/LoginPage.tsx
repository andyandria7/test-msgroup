import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth"
import { FormEvent, useState } from "react";
import extractErrors, { FieldError } from "./AuthPages";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<FieldError>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            setErrors(extractErrors(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.logo}>TM</div>
                    <h1 style={styles.title}>Connexion</h1>
                    <p style={styles.subtitle}>Accédez a votre espace de travail</p>
                </div>

                {errors.general && (
                    <div style={styles.alertError}>{errors.general}</div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Adresse email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="text@gmail.com"
                            required
                            style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }} />
                        {errors.email && <span style={styles.fieldError}>{errors.email}</span>}
                    </div>
                    <div style={styles.field}>
                         <label style={styles.label}>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="*************"
                            required
                            style={{ ...styles.input, ...(errors.password ? styles.inputError : {}) }}
                        />
                        {errors.password && <span style={styles.fieldError}>{errors.password}</span>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}>
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
                <p style={styles.switchText}>
                    Pas encore de compte ? {' '}
                    <Link to="/register" style={styles.link}>Créer un compte</Link>
                </p>
            </div>
        </div>
    )
}


const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F4F4F5",
        padding: "1rem",
    },
    card: {
        background: "#FFFFFFFF",
        borderRadius: 16,
        padding: '2rem 2.5rem',
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    },
    header: {
        textAlign: "center",
        marginBottom: "1.5rem",
    },
    logo: {
        width: 48,
        height: 48,
        borderRadius: 12,
        background: '#4F46E5',
        color: "#fff",
        fontSize: 18,
        fontWeight: 700,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        margin: "0 auto 1rem",
        letterSpacing: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 700,
        color: "#111827",
        margin: "0 0 4px",
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        margin: 0,
    },
    alertError: {
        background: '#FEE2E2',
        border: '1px solid #FECACA',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 13,
        color: '#991B1B',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    label: {
        fontSize: 13,
        fontWeight: 500,
        color: '#374151',
    },
    input: {
        padding: '10px 12px',
        borderRadius: 8,
        border: '1.5px solid #E5E7EB',
        fontSize: 14,
        color: '#111827',
        outline: 'none',
        transition: 'border-color 0.15s',
        background: '#FAFAFA',
    },
    inputError: {
        borderColor: '#F87171',
        background: '#FFF7F7',
    },
    fieldError: {
        fontSize: 12,
        color: '#DC2626',
    },
    btn: {
        padding: '11px',
        borderRadius: 8,
        border: 'none',
        background: '#4F46E5',
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        marginTop: '0.5rem',
        transition: 'background 0.15s',
    },
    btnDisabled: {
        background: '#A5B4FC',
        cursor: 'not-allowed',
    },
    switchText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#6B7280',
        marginTop: '1.25rem',
        marginBottom: 0,
    },
    link: {
        color: '#4F46E5',
        fontWeight: 500,
        textDecoration: 'none',
    },
}