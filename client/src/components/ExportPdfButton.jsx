import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ExportPdfButton() {
  const exportPDF = async () => {
    const element = document.getElementById("cv-preview");

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("CV_ATS.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      style={{
        padding: "10px 16px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginBottom: "10px"
      }}
    >
      Export PDF
    </button>
  );
}
