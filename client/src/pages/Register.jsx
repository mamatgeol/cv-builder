import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = e => {
    e.preventDefault();
    console.log(form);
    // TODO: panggil API register
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Daftar</h2>
        <p className="auth-subtitle">
          Buat akun untuk mulai membuat CV
        </p>

        <div className="auth-group">
          <label>Nama Lengkap</label>
          <input
            placeholder="Nama lengkap"
            value={form.name}
            onChange={e =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />
        </div>

        <div className="auth-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="nama@email.com"
            value={form.email}
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
        </div>

        <div className="auth-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Minimal 6 karakter"
            value={form.password}
            onChange={e =>
              setForm({ ...form, password: e.target.value })
            }
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
