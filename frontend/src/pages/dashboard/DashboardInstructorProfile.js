// src/pages/instructor/DashboardInstructorProfile.js
import React, { useState, useEffect } from 'react';
import api from "../../axios"; // ✅ ใช้ axios instance
import Header from '../../components/Header';

const DashboardInstructorProfile = () => {
  const [form, setForm] = useState({
    Instructor_id: '',
    Instructor_name: '',
    email: '',
    phone_number: '',
    department: '',
    faculty: '',
    position: '',
    profile_image: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const instructorId = localStorage.getItem('instructorId');

  useEffect(() => {
    if (instructorId) {
      api.get(`/api/instructor/${instructorId}`)
        .then((res) => {
          const data = res.data;
          setForm({
            Instructor_id: data.Instructor_id || '',
            Instructor_name: data.Instructor_name || '',
            email: data.email || '',
            phone_number: data.phone_number || '',
            department: data.department || '',
            faculty: data.faculty || '',
            position: data.position || '',
            profile_image: data.profile_image || ''
          });
        })
        .catch((err) => {
          console.error('❌ โหลดข้อมูลอาจารย์ล้มเหลว:', err);
        });
    }
  }, [instructorId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageFilename = form.profile_image;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const res = await api.post('/api/upload/profile-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        profileImageFilename = res.data.filename;
      } catch (err) {
        console.error('❌ อัปโหลดรูปไม่สำเร็จ:', err);
        alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
        return;
      }
    }

    const updatedForm = { ...form, profile_image: profileImageFilename };

    api.put(`/api/instructor/${instructorId}`, updatedForm)
      .then(() => {
        localStorage.setItem('profile_image', profileImageFilename);
        alert('✅ บันทึกข้อมูลเรียบร้อยแล้ว');
      })
      .catch((err) => {
        console.error('❌ บันทึกข้อมูลล้มเหลว:', err);
        alert('เกิดข้อผิดพลาดในการบันทึก');
      });
  };

  return (
    <div className="min-h-screen bg-[#9AE5F2] text-[#130347] font-sans">
      <Header />

      <div className="px-[5%] py-[2%]">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-4">
            👤 โปรไฟล์อาจารย์ประจำวิชา
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white text-[#130347] p-8 rounded-2xl shadow-lg border border-[#E6F0FF]"
          >
            {/* รูปโปรไฟล์ */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#E6F0FF] bg-[#F8FBFF] flex items-center justify-center">
                {form.profile_image ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/uploads/${form.profile_image}`}
                    alt="รูปโปรไฟล์"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-[#225EC4]">ไม่มีรูป</span>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#225EC4]">อัปโหลดรูปโปรไฟล์</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1 block w-full text-sm
                             file:mr-3 file:rounded-full file:border-0
                             file:bg-[#6EC7E2] file:text-white file:px-4 file:py-2
                             hover:file:bg-[#4691D3]"
                />
              </div>
            </div>

            {/* ฟิลด์ข้อมูล */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#225EC4]">รหัสอาจารย์</label>
                <input
                  name="Instructor_id"
                  value={form.Instructor_id}
                  disabled
                  className="w-full rounded-xl border border-[#E6F0FF] bg-gray-100 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#225EC4]">ชื่อ</label>
                <input
                  name="Instructor_name"
                  value={form.Instructor_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E6F0FF] bg-[#F8FBFF] px-3 py-2 outline-none focus:ring-2 focus:ring-[#6EC7E2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#225EC4]">อีเมล</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E6F0FF] bg-[#F8FBFF] px-3 py-2 outline-none focus:ring-2 focus:ring-[#6EC7E2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#225EC4]">เบอร์โทร</label>
                <input
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E6F0FF] bg-[#F8FBFF] px-3 py-2 outline-none focus:ring-2 focus:ring-[#6EC7E2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#225EC4]">ภาควิชา</label>
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E6F0FF] bg-[#F8FBFF] px-3 py-2 outline-none focus:ring-2 focus:ring-[#6EC7E2]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#225EC4]">คณะ</label>
                <input
                  name="faculty"
                  value={form.faculty}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E6F0FF] bg-[#F8FBFF] px-3 py-2 outline-none focus:ring-2 focus:ring-[#6EC7E2]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#225EC4]">ตำแหน่ง</label>
                <input
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#E6F0FF] bg-[#F8FBFF] px-3 py-2 outline-none focus:ring-2 focus:ring-[#6EC7E2]"
                />
              </div>
            </div>

            {/* ปุ่มบันทึก */}
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-[#225EC4] hover:bg-[#1b55b5] text-white py-3 font-semibold shadow-sm"
            >
              💾 บันทึก
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardInstructorProfile;
