import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError("Email sudah terdaftar");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Daftar</h2>
        <p className="auth-subtitle">Buat akun untuk mulai membuat CV</p>

        {error && <p className="auth-error">{error}</p>}

        <div className="auth-group">
          <label>Nama Lengkap</label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="auth-group">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="auth-group">
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button className="auth-button">Daftar</button>

        <div className="auth-footer">
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </div>
      </form>
    </div>
  );
}
