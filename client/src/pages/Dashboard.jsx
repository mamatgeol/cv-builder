import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CvForm from "../components/CVForm";
import CvPreview from "../components/CVPreview";
import api from "../api";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

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

  /* =============================
     LOAD CV SAAT DASHBOARD DIBUKA
     ============================= */
  useEffect(() => {
    const loadCv = async () => {
      try {
        const res = await api.get("/cv/me");
        if (res.data) setCv(res.data);
      } catch {
        console.log("CV belum ada");
      }
    };
    loadCv();
  }, []);

  /* =============================
     AUTOSAVE CV (5 DETIK)
     ============================= */
  useEffect(() => {
    const timeout = setTimeout(() => {
      api.post("/cv", cv);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [cv]);

  /* =============================
     EXPORT PDF (ATS FRIENDLY)
     ============================= */
  const handleExportPDF = async () => {
    const element = document.querySelector("#cv-preview .a4");
    if (!element) {
      alert("CV Preview tidak ditemukan");
      return;
    }

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

    element.style.transform = originalTransform;
    element.style.boxShadow = originalBoxShadow;
  };

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


  return (
    <div className="dashboard">
      <div className="form-panel">
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

        <hr style={{ borderColor: "#444", margin: "15px 0" }} />

        <CvForm cv={cv} setCv={setCv} />
      </div>

      <div className="preview-panel">
        <CvPreview cv={cv} />
      </div>
    </div>
  );
}
