import React, { useState } from 'react';

const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Telugu', 'Hindi', 'Computer Science', 'General Knowledge', 'Physics', 'Biology'];
const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
const degrees = ['B.Sc', 'B.Tech', 'M.Sc', 'M.Tech', 'B.Com', 'M.Com', 'Other'];
const qualifications = ['B.Ed', 'M.Ed', 'Ph.D', 'Diploma', 'Other'];

export default function UserForm() {
  const [formType, setFormType] = useState<'parent' | 'tutor'>('parent');
  const [formData, setFormData] = useState<any>({});
  const [customDegree, setCustomDegree] = useState('');
  const [customQualification, setCustomQualification] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullData = {
      ...formData,
      degree: formData.degree === 'Other' ? customDegree : formData.degree,
      qualification: formData.qualification === 'Other' ? customQualification : formData.qualification,
    };

    const formPayload = new FormData();
    Object.entries(fullData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    if (file) {
      formPayload.append('resume', file);
    }

    console.log('Form submission:', fullData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/diqux3y0a/video/upload/v1754030057/vecteezy_ai-generated-a-classroom-with-desks-and-chairs-in-front-of-a_46014412_1_jzl6u1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Form Overlay */}
      <div className="relative z-10 min-h-screen  flex items-center justify-center  py-10">
        <div className="w-full max-w-4xl bg-white/50 bg-opacity-90 backdrop-blur-md p-10 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Join as a {formType === 'parent' ? 'Parent/Student' : 'Tutor'}
          </h2>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => setFormType('parent')}
              type="button"
              className={`px-6 py-2 font-medium border rounded-l-md transition ${formType === 'parent' ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-700'}`}
            >
              Student/Parent
            </button>
            <button
              onClick={() => setFormType('tutor')}
              type="button"
              className={`px-14 py-2 font-medium border rounded-r-md transition ${formType === 'tutor' ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-700'}`}
            >
              Tutor
            </button>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <input className="form-input" name="name" placeholder="Name" onChange={handleInputChange} required />
            <input className="form-input" name="contact" placeholder="Contact Number" type="tel" pattern="[0-9]{10}" onChange={handleInputChange} required />
            <input className="form-input" name="email" placeholder="Email ID" type="email" onChange={handleInputChange} required />

            {formType === 'parent' ? (
              <>
                <input className="form-input" name="area" placeholder="Area" onChange={handleInputChange} />
                <select className="form-input" name="subject" onChange={handleInputChange} required>
                  <option value="">Select Subject</option>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select className="form-input" name="grade" onChange={handleInputChange} required>
                  <option value="">Select Grade</option>
                  {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </>
            ) : (
              <>
                <select className="form-input" name="subject" onChange={handleInputChange} required>
                  <option value="">Select Subject</option>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select className="form-input" name="grade" onChange={handleInputChange} required>
                  <option value="">Select Grade</option>
                  {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <select className="form-input" name="degree" onChange={handleInputChange} required>
                  <option value="">Select Degree</option>
                  {degrees.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {formData.degree === 'Other' && (
                  <input className="form-input" placeholder="Enter Custom Degree" value={customDegree} onChange={(e) => setCustomDegree(e.target.value)} />
                )}
                <select className="form-input" name="qualification" onChange={handleInputChange} required>
                  <option value="">Select Qualification</option>
                  {qualifications.map((q) => <option key={q} value={q}>{q}</option>)}
                </select>
                {formData.qualification === 'Other' && (
                  <input className="form-input" placeholder="Enter Custom Qualification" value={customQualification} onChange={(e) => setCustomQualification(e.target.value)} />
                )}
                <input className="form-input" name="travelAreas" placeholder="Interested Areas to Travel" onChange={handleInputChange} />
                <input type="file" className="form-input md:col-span-2" onChange={handleFileChange} />
              </>
            )}

            <button type="submit" className="md:col-span-2 bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-md transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
