import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import CvForm from "../components/CVForm";
import CvPreview from "../components/CVPreview";
import "../styles/dashboard.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function Dashboard() {
  const navigate = useNavigate(); // 2. Inisialisasi navigasi

  const [cv, setCv] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    summary: "",
    experience: [],
    education: [],
    skills: []
  });

  const handleExportPDF = async () => {
  const element = document.querySelector("#cv-preview .a4");

  if (!element) {
    alert("CV Preview tidak ditemukan");
    return;
  }

  // Matikan efek visual sementara
  const originalTransform = element.style.transform;
  const originalBoxShadow = element.style.boxShadow;

  element.style.transform = "scale(1)";
  element.style.boxShadow = "none";

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = 210;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("CV_ATS_Format.pdf");

  // Kembalikan efek visual
  element.style.transform = originalTransform;
  element.style.boxShadow = originalBoxShadow;
};


  // 3. Fungsi Log Out
  const handleLogout = () => {
    // Jika nanti kamu pakai localStorage untuk simpan token, hapus disini:
    // localStorage.removeItem("token"); 
    
    navigate("/login"); // Arahkan kembali ke login
  };

  return (
    <div className="dashboard">
      <div className="form-panel">
        
        {/* 4. Tambahkan Header Kecil dengan Tombol Logout disini */}
        <div className="dashboard-header">
            <h3 style={{ color: "white", margin: 0 }}>RESUME.in</h3>

            <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleExportPDF} className="btn-export">
                    Export PDF
                </button>

                <button onClick={handleLogout} className="btn-logout">
                Keluar
                </button>
            </div>
        </div>
        <hr style={{ borderColor: '#444', margin: '15px 0' }}/>

        <CvForm cv={cv} setCv={setCv} />
      </div>

      

      <div className="preview-panel">
        <CvPreview cv={cv} />
      </div>
    </div>
  );
}