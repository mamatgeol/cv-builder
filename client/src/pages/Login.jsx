import { useState } from "react";
// 1. Tambahkan import useNavigate
import { Link, useNavigate } from "react-router-dom"; 
import "../styles/auth.css";

export default function Login() {
  // 2. Inisialisasi hook navigate
  const navigate = useNavigate(); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = e => {
    e.preventDefault();
    console.log({ email, password });
    
    // TODO: panggil API login (nanti)
    
    // 3. Tambahkan perintah ini untuk pindah ke Dashboard
    navigate("/dashboard"); 
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        {/* ... sisa kode tampilan tetap sama ... */}
        <h2>Masuk</h2>
        <p className="auth-subtitle">
          Login untuk mengelola CV Anda
        </p>

        <div className="auth-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-button">Masuk</button>

        <div className="auth-footer">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </div>
      </form>
    </div>
  );
}