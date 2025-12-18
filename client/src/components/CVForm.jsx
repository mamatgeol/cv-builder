/* Komponen Input & Textarea Sederhana */
function Input({ label, value, onChange, placeholder }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
      />
    </div>
  );
}

/* ===== EXPERIENCE FORM (Dengan Fitur Multi-Point) ===== */
function ExperienceForm({ cv, setCv }) {
  // Tambah Pengalaman Baru (Template Kosong)
  const addExperience = () => {
    setCv({
      ...cv,
      experience: [...cv.experience, { role: "", date: "", points: [""] }]
    });
  };

  const removeExperience = (index) => {
    const data = [...cv.experience];
    data.splice(index, 1);
    setCv({ ...cv, experience: data });
  };

  const updateExperience = (index, field, value) => {
    const data = [...cv.experience];
    data[index][field] = value;
    setCv({ ...cv, experience: data });
  };

  // Update text bullet point tertentu
  const updatePoint = (expIndex, pointIndex, value) => {
    const data = [...cv.experience];
    data[expIndex].points[pointIndex] = value;
    setCv({ ...cv, experience: data });
  };

  // Tambah bullet point baru di dalam satu pengalaman
  const addPoint = (expIndex) => {
    const data = [...cv.experience];
    data[expIndex].points.push("");
    setCv({ ...cv, experience: data });
  };

  // Hapus bullet point
  const removePoint = (expIndex, pointIndex) => {
    const data = [...cv.experience];
    data[expIndex].points.splice(pointIndex, 1);
    setCv({ ...cv, experience: data });
  };

  return (
    <>
      <h3>Pengalaman Kerja & Proyek</h3>
      {cv.experience.map((exp, i) => (
        <div key={i} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <strong>Posisi #{i + 1}</strong>
            <button onClick={() => removeExperience(i)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Hapus</button>
          </div>

          <Input label="Posisi / Judul Proyek" value={exp.role} placeholder="Contoh: Web Developer / Website Mie Ayam"
            onChange={v => updateExperience(i, 'role', v)} />

          <Input label="Periode / Nama Kampus" value={exp.date} placeholder="Contoh: Jan 2023 - Sekarang"
            onChange={v => updateExperience(i, 'date', v)} />

          <label style={{display:'block', marginBottom:'5px', fontWeight:'bold'}}>Deskripsi (Poin-poin):</label>
          {exp.points.map((point, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
              <input 
                style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                value={point} 
                onChange={(e) => updatePoint(i, idx, e.target.value)} 
                placeholder={`• Poin penjelasan ke-${idx+1}`}
              />
              <button onClick={() => removePoint(i, idx)} style={{cursor:'pointer'}}>X</button>
            </div>
          ))}
          
          <button onClick={() => addPoint(i)} style={{ fontSize: '12px', marginTop: '5px', cursor:'pointer' }}>
            + Tambah Poin Deskripsi
          </button>
        </div>
      ))}

      <button onClick={addExperience} className="btn-primary" style={{marginTop:'10px'}}>+ Tambah Pengalaman/Proyek</button>
    </>
  );
}

/* ===== EDUCATION FORM ===== */
function EducationForm({ cv, setCv }) {
  const add = () => {
    setCv({ ...cv, education: [...cv.education, { degree: "", date: "" }] });
  };

  const update = (i, field, value) => {
    const data = [...cv.education];
    data[i][field] = value;
    setCv({ ...cv, education: data });
  };

  const remove = (i) => {
    const data = [...cv.education];
    data.splice(i, 1);
    setCv({ ...cv, education: data });
  };

  return (
    <>
      <h3>Pendidikan</h3>
      {cv.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <Input label="Institusi & Gelar" value={edu.degree} placeholder="Universitas..."
            onChange={v => update(i, 'degree', v)} />
          <Input label="Tahun" value={edu.date} placeholder="2019 - 2023"
            onChange={v => update(i, 'date', v)} />
          <button onClick={() => remove(i)} style={{fontSize:'12px', color:'red', border:'none', background:'none', cursor:'pointer'}}>Hapus</button>
        </div>
      ))}
      <button onClick={add} style={{marginTop:'5px'}}>+ Tambah Pendidikan</button>
    </>
  );
}

/* ===== SKILLS FORM ===== */
function SkillsForm({ cv, setCv }) {
  const add = e => {
    if (e.key === "Enter" && e.target.value) {
      e.preventDefault();
      setCv({ ...cv, skills: [...cv.skills, e.target.value] });
      e.target.value = "";
    }
  };

  const remove = (index) => {
    const newSkills = [...cv.skills];
    newSkills.splice(index, 1);
    setCv({ ...cv, skills: newSkills });
  };

  return (
    <>
      <h3>Keahlian</h3>
      <input placeholder="Ketik skill lalu tekan Enter..." onKeyDown={add} style={{width: '100%', padding: '8px', marginBottom: '10px'}} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {cv.skills.map((s, i) => (
          <span key={i} style={{ background: '#eee', padding: '5px 10px', borderRadius: '15px', fontSize: '12px' }}>
            {s} <span onClick={() => remove(i)} style={{ cursor: 'pointer', marginLeft: '5px', color: 'red', fontWeight:'bold' }}>x</span>
          </span>
        ))}
      </div>
    </>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function CvForm({ cv, setCv }) {
  return (
    <div className="cv-form-container" style={{ paddingBottom: '50px' }}>
      <h2>Data Pribadi</h2>

      <Input label="Nama Lengkap" value={cv.name} placeholder="Nama Anda"
        onChange={v => setCv({ ...cv, name: v })} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <Input label="Alamat" value={cv.address} placeholder="Kota, Provinsi"
          onChange={v => setCv({ ...cv, address: v })} />
        <Input label="No. Telepon" value={cv.phone} placeholder="+62..."
          onChange={v => setCv({ ...cv, phone: v })} />
      </div>

      <Input label="Email" value={cv.email} placeholder="email@anda.com"
        onChange={v => setCv({ ...cv, email: v })} />

      <Textarea label="Ringkasan Profil" value={cv.summary} placeholder="Deskripsikan diri Anda secara singkat..."
        onChange={v => setCv({ ...cv, summary: v })} />

      <hr style={{ margin: '20px 0' }} />
      <ExperienceForm cv={cv} setCv={setCv} />
      
      <hr style={{ margin: '20px 0' }} />
      <EducationForm cv={cv} setCv={setCv} />
      
      <hr style={{ margin: '20px 0' }} />
      <SkillsForm cv={cv} setCv={setCv} />
    </div>
  );
}