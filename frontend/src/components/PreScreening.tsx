import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface FormData {
  tenthDocument: File | null;
  twelfthDocument: File | null;
  degreeResultFile: File | null;
  tenthBoard: string;
  tenthYear: string;
  tenthPercentage: string;
  twelfthBoard: string;
  twelfthYear: string;
  twelfthPercentage: string;
  degreeUniversity: string;
  degreeLastSemResult: string;
  userId: string;
}

const PreScreening: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    tenthDocument: null,
    twelfthDocument: null,
    degreeResultFile: null,
    tenthBoard: '',
    tenthYear: '',
    tenthPercentage: '',
    twelfthBoard: '',
    twelfthYear: '',
    twelfthPercentage: '',
    degreeUniversity: '',
    degreeLastSemResult: '',
    userId: '',
  });

  const handleFileDrop = useCallback(
    (acceptedFiles: File[], key: keyof FormData) => {
      const file = acceptedFiles[0];
      if (file) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [key]: file,
        }));
      }
    },
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const IIMSTC_ID = localStorage.getItem('IIMSTC_ID'); // Retrieve IIMSTC_ID from local storage
        if (IIMSTC_ID) {
          const response = await axios.get(`/api/users/current-user?IIMSTC_ID=${IIMSTC_ID}`);
          setFormData((prevFormData) => ({
            ...prevFormData,
            userId: response.data.userId, // Set userId from response
          }));
        }
      } catch (error) {
        console.error('Error fetching user ID', error);
      }
    };

    fetchUserId();
  }, []);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('tenthBoard', formData.tenthBoard);
    data.append('tenthYear', formData.tenthYear);
    data.append('tenthPercentage', formData.tenthPercentage);
    data.append('twelfthBoard', formData.twelfthBoard);
    data.append('twelfthYear', formData.twelfthYear);
    data.append('twelfthPercentage', formData.twelfthPercentage);
    data.append('degreeUniversity', formData.degreeUniversity);
    data.append('degreeLastSemResult', formData.degreeLastSemResult);
    data.append('userId', formData.userId); // Add userId here

    if (formData.tenthDocument) {
      data.append('tenthDocument', formData.tenthDocument);
    }
    if (formData.twelfthDocument) {
      data.append('twelfthDocument', formData.twelfthDocument);
    }
    if (formData.degreeResultFile) {
      data.append('degreeResultFile', formData.degreeResultFile);
    }

    try {
      const response = await axios.post('/api/prescreening/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const { getRootProps: getTenthRootProps, getInputProps: getTenthInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
    onDrop: (acceptedFiles) => handleFileDrop(acceptedFiles, 'tenthDocument'),
  });

  const { getRootProps: getTwelfthRootProps, getInputProps: getTwelfthInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
    onDrop: (acceptedFiles) => handleFileDrop(acceptedFiles, 'twelfthDocument'),
  });

  const { getRootProps: getDegreeRootProps, getInputProps: getDegreeInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
    onDrop: (acceptedFiles) => handleFileDrop(acceptedFiles, 'degreeResultFile'),
  });

  return (
    <div>
      <h1>Pre-Screening Form</h1>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div>
            <div className="mb-4">
              <label htmlFor="tenthBoard" className="block text-sm font-medium text-gray-700">10th Board</label>
              <input
                type="text"
                name="tenthBoard"
                id="tenthBoard"
                value={formData.tenthBoard}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tenthYear" className="block text-sm font-medium text-gray-700">10th Year of Passing</label>
              <input
                type="text"
                name="tenthYear"
                id="tenthYear"
                value={formData.tenthYear}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tenthPercentage" className="block text-sm font-medium text-gray-700">10th Percentage/CGPA</label>
              <input
                type="text"
                name="tenthPercentage"
                id="tenthPercentage"
                value={formData.tenthPercentage}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div {...getTenthRootProps()} className="mb-4 border-dashed border-2 border-gray-300 p-4">
              <input {...getTenthInputProps()} />
              <p>Drag 'n' drop 10th Marks Card here, or click to select file</p>
              {formData.tenthDocument && <p>{formData.tenthDocument.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="twelfthBoard" className="block text-sm font-medium text-gray-700">12th Board</label>
              <input
                type="text"
                name="twelfthBoard"
                id="twelfthBoard"
                value={formData.twelfthBoard}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="twelfthYear" className="block text-sm font-medium text-gray-700">12th Year of Passing</label>
              <input
                type="text"
                name="twelfthYear"
                id="twelfthYear"
                value={formData.twelfthYear}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="twelfthPercentage" className="block text-sm font-medium text-gray-700">12th Percentage/CGPA</label>
              <input
                type="text"
                name="twelfthPercentage"
                id="twelfthPercentage"
                value={formData.twelfthPercentage}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div {...getTwelfthRootProps()} className="mb-4 border-dashed border-2 border-gray-300 p-4">
              <input {...getTwelfthInputProps()} />
              <p>Drag 'n' drop 12th Marks Card here, or click to select file</p>
              {formData.twelfthDocument && <p>{formData.twelfthDocument.name}</p>}
            </div>
            <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <div className="mb-4">
              <label htmlFor="degreeUniversity" className="block text-sm font-medium text-gray-700">Degree University</label>
              <input
                type="text"
                name="degreeUniversity"
                id="degreeUniversity"
                value={formData.degreeUniversity}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="degreeLastSemResult" className="block text-sm font-medium text-gray-700">Degree Last Semester Result</label>
              <input
                type="text"
                name="degreeLastSemResult"
                id="degreeLastSemResult"
                value={formData.degreeLastSemResult}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div {...getDegreeRootProps()} className="mb-4 border-dashed border-2 border-gray-300 p-4">
              <input {...getDegreeInputProps()} />
              <p>Drag 'n' drop Degree Marks/Latest Sem Marks Card here, or click to select file</p>
              {formData.degreeResultFile && <p>{formData.degreeResultFile.name}</p>}
            </div>
            
            <div className="flex justify-between">
              <button type="button" onClick={handlePrev} className="px-4 py-2 bg-gray-300 rounded text-gray-700">Previous</button>
              <button type="submit" className="px-4 py-2 bg-green-500 rounded text-white">Submit</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PreScreening;
