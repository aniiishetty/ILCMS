import React, { useState, useEffect } from 'react';
import { createAicteIntern, updateAicteIntern, getAicteInternById } from '../services/aicteInternService';
import { fetchUserDetails } from '../services/userService';

interface AICTEProps {
  id?: number; // ID for editing an existing record
  userId: number; // User ID for fetching common fields
}

const AICTE: React.FC<AICTEProps> = ({ id, userId }) => {
  const [formData, setFormData] = useState<any>({
    email: '',
    phoneNumber: '',
    fullName: '',
    homeAddress: '',
    rollNumber: '',
    academicConcentration: '',
    overallGPA: '',
    semester: '',
    academicYear: '',
    schoolName: '',
    schoolCityState: '',
    campusAddress: '',
    campusPhoneNumber: '',
    campusFaxNumber: '',
    schoolEmail: '',
    hodName: '',
    hodEmail: '',
    resume: null,
    internshipPreferences: '',
    learningObjectives: '',
    technicalSkills: '',
    internshipActivities: '',
    evidenceToFaculty: '',
    userId: userId, // Ensure the userId is set
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await getAicteInternById(id);
          setFormData(data);
        }
        // Fetch common user details
        const userData = await fetchUserDetails(userId);
        setFormData((prevData: { email: any; phoneNumber: any; fullName: any; homeAddress: any; academicConcentration: any; rollNumber: any; semester: any; schoolName: any}) => ({
          ...prevData,
          email: userData.email || prevData.email,
          phoneNumber: userData.phoneNumber || prevData.phoneNumber,
          fullName: userData.name || prevData.fullName,
          homeAddress: userData.address || prevData.homeAddress,
          academicConcentration:userData.branch || prevData.academicConcentration,
          rollNumber:userData.usn || prevData.rollNumber,
          semester:userData.semester || prevData.semester,
          schoolName:userData.collegeName || prevData.schoolName
          // Add any other common fields here
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateAicteIntern(id, formData);
        alert('AicteIntern record updated successfully!');
      } else {
        await createAicteIntern(formData);
        alert('AicteIntern record created successfully!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="aicteIntern-container">
      <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">{id ? 'Update AicteIntern' : '[AICTE] Student Internship Program Application'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <label className="block">
            <span className="font-bold">Student Email Address *</span>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="write your email address"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Student Phone Number *</span>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="(212) 123 4567"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Student Full Name *</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="please write your legal, full name (ex) Peter Jackson"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Student Home Address *</span>
            <input
              type="text"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              placeholder="please write down your home address"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Student Roll Number *</span>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="please write your college/university roll number"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Student Academic Concentration *</span>
            <input
              type="text"
              name="academicConcentration"
              value={formData.academicConcentration}
              onChange={handleChange}
              placeholder="please write your academic concentration (ex) B.Tech in Computer Science Engineering"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Student Overall GPA *</span>
            <input
              type="text"
              name="overallGPA"
              value={formData.overallGPA}
              onChange={handleChange}
              placeholder="please write your overall GPA (ex) 4.0/4.3"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Student Semester *</span>
            <input
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              placeholder="please write your current semester (ex) 7th Semester"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Student Academic Year *</span>
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              placeholder="please write your current academic year (ex) 3rd Year"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          
          <label className="block">
            <span className="font-bold">Name of School / Institutes / University *</span>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="Please write name of your school"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">School's City and State *</span>
            <input
              type="text"
              name="schoolCityState"
              value={formData.schoolCityState}
              onChange={handleChange}
              placeholder="find and fill in school's city / state / country (ex) Cleveland, Ohio, United States"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">School Campus Address *</span>
            <input
              type="text"
              name="campusAddress"
              value={formData.campusAddress}
              onChange={handleChange}
              placeholder="Campus address in case you do not have it, please leave this field blank."
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Campus Phone Number *</span>
            <input
              type="text"
              name="campusPhoneNumber"
              value={formData.campusPhoneNumber}
              onChange={handleChange}
              placeholder="(212) 123 4567"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Campus Fax Number *</span>
            <input
              type="text"
              name="campusFaxNumber"
              value={formData.campusFaxNumber}
              onChange={handleChange}
              placeholder="(212) 123 4567"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Campus Email Address *</span>
            <input
              type="email"
              name="schoolEmail"
              value={formData.schoolEmail}
              onChange={handleChange}
              placeholder="write your campus email address"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Head of Department (HOD) Name *</span>
            <input
              type="text"
              name="hodName"
              value={formData.hodName}
              onChange={handleChange}
              placeholder="write the name of the Head of Department (HOD)"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">HOD Email Address *</span>
            <input
              type="email"
              name="hodEmail"
              value={formData.hodEmail}
              onChange={handleChange}
              placeholder="write the email address of the HOD"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Upload Resume *</span>
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Internship Preferences *</span>
            <textarea
              name="internshipPreferences"
              value={formData.internshipPreferences}
              onChange={handleChange}
              placeholder="write your internship preferences"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Learning Objectives *</span>
            <textarea
              name="learningObjectives"
              value={formData.learningObjectives}
              onChange={handleChange}
              placeholder="write your learning objectives"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Technical Skills *</span>
            <textarea
              name="technicalSkills"
              value={formData.technicalSkills}
              onChange={handleChange}
              placeholder="write your technical skills"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Internship Activities *</span>
            <textarea
              name="internshipActivities"
              value={formData.internshipActivities}
              onChange={handleChange}
              placeholder="write your internship activities"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          
          <label className="block">
            <span className="font-bold">Evidence to Faculty *</span>
            <textarea
              name="evidenceToFaculty"
              value={formData.evidenceToFaculty}
              onChange={handleChange}
              placeholder="write evidence to faculty"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AICTE;
