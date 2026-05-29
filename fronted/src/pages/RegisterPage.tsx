import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { useState } from "react";
import { FieldError } from "./AuthPages";

export default function RegisterPage(){
    const {register} = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState<FieldError>({});
    const [loading, setLoading] = useState(false);
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F4F4F5',
    padding: '1rem',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '2rem 2.5rem',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: '#4F46E5',
    color: '#fff',
    fontSize: 18,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 4px',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
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
};