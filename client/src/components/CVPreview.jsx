import "../styles/cv.css"; // Pastikan path css sesuai

export default function CvPreview({ cv }) {
  // --- DATA CONTOH (Default State) ---
  // Data ini hanya muncul jika state asli (cv) kosong
  const exampleData = {
    name: "NAMA KAMU",
    title: "Mahasiswa Informatika / Web Developer",
    address: "Tangerang, Banten",
    phone: "+62 8123 3456 7890",
    email: "email@example.com",
    summary: "Seorang mahasiswa Statistika dan Sains Data yang antusias dan berdedikasi dengan minat kuat dalam pengembangan web dan teknologi. Memiliki kemampuan dalam berbagai bahasa pemrograman serta pengalaman dalam proyek-proyek pengembangan web. Bersemangat untuk terus belajar dan berkontribusi dalam dunia teknologi.",
    experience: [
      {
        role: "Humas Technoday 2025 - UKM RIPTEK UNNES",
        date: "Agustus 2025 - Oktober 2025",
        points: [
          "Bertanggung jawab dalam mengelola pesertaan lomba dan komunikasi dengan peserta.",
        ]
      },
      {
        role: "Web Developer - Projek Website \"Sodik Jalan Jalan\"",
        date: "Proyek Kuliah",
        points: [
          "Membangun website pariwisata menggunakan React dan Tailwind CSS.",
          "Berpartisipasi dalam perancangan UI/UX untuk meningkatkan pengalaman pengguna."
        ]
      }
    ],
    education: [
      {
        degree: "S1 Statistika dan Sains Data, Universitas Negeri Semarang",
        date: "2023 - Sekarang"
      },
      {
        degree: "SMA Example High School",
        date: "2019 - 2022"
      }
    ],
    skills: ["Figma", "React", "JavaScript", "SQL", "Python", "UI/UX"]
  };

  // --- LOGIKA PENGGABUNGAN ---
  // Jika cv.name kosong, pakai exampleData.name, dst.
  const display = {
    name: cv.name || exampleData.name,
    title: cv.title || exampleData.title,
    address: cv.address || exampleData.address,
    phone: cv.phone || exampleData.phone,
    email: cv.email || exampleData.email,
    summary: cv.summary || exampleData.summary,
    
    // Untuk Array: Jika user punya data (length > 0), pakai punya user. Jika tidak, pakai contoh.
    experience: cv.experience.length > 0 ? cv.experience : exampleData.experience,
    education: cv.education.length > 0 ? cv.education : exampleData.education,
    skills: cv.skills.length > 0 ? cv.skills : exampleData.skills,
  };

  return (
    <div id="cv-preview" className="cv-preview a4-container">
      <div className="a4">
        {/* Header */}
        <div className="cv-header">
          <h1 style={{ textTransform: "uppercase", fontWeight: "bold" }}>{display.name}</h1>
          <p style={{ margin: "5px 0" }}>
            {display.address} | {display.phone} | {display.email}
          </p>
        </div>

        <hr style={{ border: "1px solid black", margin: "10px 0" }} />

        {/* Tentang Saya */}
        <section>
          <h3 style={{ textTransform: "uppercase", borderBottom: "2px solid black", paddingBottom: "5px" }}>TENTANG SAYA</h3>
          <p style={{ textAlign: "justify", lineHeight: "1.4" }}>{display.summary}</p>
        </section>

        {/* Pendidikan */}
        <section>
          <h3 style={{ textTransform: "uppercase", borderBottom: "2px solid black", paddingBottom: "5px" }}>PENDIDIKAN</h3>
          {display.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <div style={{ fontWeight: "bold" }}>{edu.degree}</div>
              <div style={{ fontStyle: "italic", fontSize: "0.9em" }}>{edu.date}</div>
            </div>
          ))}
        </section>

        {/* Keterampilan */}
        <section>
          <h3 style={{ textTransform: "uppercase", borderBottom: "2px solid black", paddingBottom: "5px" }}>KETERAMPILAN</h3>
          <ul style={{ paddingLeft: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
             {display.skills.map((skill, i) => (
               <li key={i}>{skill}</li>
             ))}
          </ul>
        </section>

        {/* Pengalaman / Proyek */}
        <section>
          <h3 style={{ textTransform: "uppercase", borderBottom: "2px solid black", paddingBottom: "5px" }}>PENGALAMAN & PROYEK</h3>
          {display.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>{exp.role}</div>
              <div style={{ fontStyle: "italic", marginBottom: "5px" }}>{exp.date}</div>
              <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
                {exp.points.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: "3px" }}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}