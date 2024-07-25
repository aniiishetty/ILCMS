import React, { useState, useEffect } from 'react';
import { fetchUserDetails } from '../services/userService';
import { useParams, useNavigate } from 'react-router-dom';

const AicteInternForm: React.FC = () => {
  const [formData, setFormData] = useState({
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
    resume: null as File | null,
    internshipPreferences: '',
    learningObjectives: '',
    technicalSkills: '',
    internshipActivities: '',
    evidenceToFaculty: '',
    email: '',  // Add email field
    phoneNumber: '',  // Add phoneNumber field
    fullName: '', 
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      const id = parseInt(userId, 10);
      fetchUserDetails(id)
        .then(user => {
          console.log('User details fetched successfully:', user);
          setFormData(prevState => ({
            ...prevState,
            homeAddress: user.address,
            rollNumber: user.usn,
            academicConcentration: user.branch,
            semester: user.semester,
            academicYear: user.academicYear,
            schoolName: user.collegeName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            fullName: user.name
          }));
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          alert('Failed to fetch user details. Please try again later.');
        });
    } else {
      console.error('User ID is not defined');
      alert('User ID is not defined. Please check the URL and try again.');
    }
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to ${value}`);
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files;
    if (fileInput && fileInput.length > 0) {
      console.log('File selected:', fileInput[0]);
      setFormData(prevState => ({ ...prevState, resume: fileInput[0] }));
    } else {
      console.log('File input cleared');
      setFormData(prevState => ({ ...prevState, resume: null }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setAlertMessage('Form submitted successfully.');
    setTimeout(() => {
      setAlertMessage(null);
      navigate('/calendar');
    }, 3000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">AICTE Student Internship Program Application</h1>
        <h2 className="text-xl font-semibold">Objective/Guidelines/Agreement | WorkForms</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
        <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Home Address */}
          <div className="form-group">
            <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-700">Home Address</label>
            <input
              type="text"
              id="homeAddress"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Roll Number */}
          <div className="form-group">
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Academic Concentration */}
          <div className="form-group">
            <label htmlFor="academicConcentration" className="block text-sm font-medium text-gray-700">Academic Concentration</label>
            <input
              type="text"
              id="academicConcentration"
              name="academicConcentration"
              value={formData.academicConcentration}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Overall GPA */}
          <div className="form-group">
            <label htmlFor="overallGPA" className="block text-sm font-medium text-gray-700">Overall GPA</label>
            <input
              type="text"
              id="overallGPA"
              name="overallGPA"
              value={formData.overallGPA}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Semester */}
          <div className="form-group">
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
            <input
              type="text"
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Academic Year */}
          <div className="form-group">
            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">Academic Year</label>
            <input
              type="text"
              id="academicYear"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* School Name */}
          <div className="form-group">
            <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">School Name</label>
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* School City/State */}
          <div className="form-group">
            <label htmlFor="schoolCityState" className="block text-sm font-medium text-gray-700">School City/State</label>
            <input
              type="text"
              id="schoolCityState"
              name="schoolCityState"
              value={formData.schoolCityState}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Campus Address */}
          <div className="form-group">
            <label htmlFor="campusAddress" className="block text-sm font-medium text-gray-700">Campus Address</label>
            <input
              type="text"
              id="campusAddress"
              name="campusAddress"
              value={formData.campusAddress}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Campus Phone Number */}
          <div className="form-group">
            <label htmlFor="campusPhoneNumber" className="block text-sm font-medium text-gray-700">Campus Phone Number</label>
            <input
              type="text"
              id="campusPhoneNumber"
              name="campusPhoneNumber"
              value={formData.campusPhoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Campus Fax Number */}
          <div className="form-group">
            <label htmlFor="campusFaxNumber" className="block text-sm font-medium text-gray-700">Campus Fax Number</label>
            <input
              type="text"
              id="campusFaxNumber"
              name="campusFaxNumber"
              value={formData.campusFaxNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* School Email */}
          <div className="form-group">
            <label htmlFor="schoolEmail" className="block text-sm font-medium text-gray-700">School Email</label>
            <input
              type="email"
              id="schoolEmail"
              name="schoolEmail"
              value={formData.schoolEmail}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* HOD Name */}
          <div className="form-group">
            <label htmlFor="hodName" className="block text-sm font-medium text-gray-700">HOD Name</label>
            <input
              type="text"
              id="hodName"
              name="hodName"
              value={formData.hodName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* HOD Email */}
          <div className="form-group">
            <label htmlFor="hodEmail" className="block text-sm font-medium text-gray-700">HOD Email</label>
            <input
              type="email"
              id="hodEmail"
              name="hodEmail"
              value={formData.hodEmail}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Resume */}
          <div className="form-group">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>

          {/* Internship Preferences */}
          <div className="form-group">
            <label htmlFor="internshipPreferences" className="block text-sm font-medium text-gray-700">Internship Preferences</label>
            <textarea
              id="internshipPreferences"
              name="internshipPreferences"
              value={formData.internshipPreferences}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          {/* Learning Objectives */}
          <div className="form-group">
            <label htmlFor="learningObjectives" className="block text-sm font-medium text-gray-700">Learning Objectives</label>
            <textarea
              id="learningObjectives"
              name="learningObjectives"
              value={formData.learningObjectives}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          {/* Technical Skills */}
          <div className="form-group">
            <label htmlFor="technicalSkills" className="block text-sm font-medium text-gray-700">Technical Skills</label>
            <textarea
              id="technicalSkills"
              name="technicalSkills"
              value={formData.technicalSkills}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          {/* Internship Activities */}
          <div className="form-group">
            <label htmlFor="internshipActivities" className="block text-sm font-medium text-gray-700">Internship Activities</label>
            <textarea
              id="internshipActivities"
              name="internshipActivities"
              value={formData.internshipActivities}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          {/* Evidence to Faculty */}
          <div className="form-group">
            <label htmlFor="evidenceToFaculty" className="block text-sm font-medium text-gray-700">Evidence to Faculty</label>
            <textarea
              id="evidenceToFaculty"
              name="evidenceToFaculty"
              value={formData.evidenceToFaculty}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AicteInternForm;
