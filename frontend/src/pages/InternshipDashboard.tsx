import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface User {
    id: number;
    IIMSTC_ID: string;
    name: string;
    dob: Date;
    address: string;
    collegeId: number;
    university: string;
    usn: string;
    email: string;
    gender: string;
    semester: string;
    phoneNumber: string;
    passportPhoto: string;
    aadharNo: string;
    aadharProof: string;
    degreeId: number;
    degreeStatusId: number | null;
    branchId: number;
    InternshipApproved: boolean | null; // Ensure this matches the backend model
}

interface PreScreening {
    isApproved: boolean;
    isDeclined: boolean;
    id: number;
    tenthBoard: string;
    tenthYear: string;
    tenthPercentage: string;
    tenthDocument: string; // Assuming it's a URL or base64 string
    twelfthBoard: string;
    twelfthYear: string;
    twelfthPercentage: string;
    twelfthDocument: string; // Assuming it's a URL or base64 string
    degreeUniversity: string;
    degreeLastSemResult: string;
    degreeResultFile: string; // Assuming it's a URL or base64 string
    user: User;
}

const InternshipDashboard = () => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [preScreenings, setPreScreenings] = useState<PreScreening[]>([]);
    const [approvedStudents, setApprovedStudents] = useState<PreScreening[]>([]);
    const [declinedStudents, setDeclinedStudents] = useState<PreScreening[]>([]);
    const [isPreScreeningOpen, setIsPreScreeningOpen] = useState(false);

    useEffect(() => {
        const fetchPreScreenings = async () => {
            try {
                const response = await axios.get('/api/prescreening/all'); // Adjust the URL according to your backend route
                const data = response.data;

                // Check if the data is an array and log its length
                if (Array.isArray(data)) {
                    console.log(`Number of records fetched: ${data.length}`);
                } else {
                    console.warn('Fetched data is not an array:', data);
                    return;
                }

                // Detailed logging of each item in the fetched data
                data.forEach((item: PreScreening) => {
                    console.log('Processing item:', item);
                    console.log('InternshipApproved:', item.user.InternshipApproved);
                });

                // Ensure proper handling of undefined or null values
                const preScreeningFiltered = data.filter((item: PreScreening) => {
                    console.log('Filtering item for preScreening:', item.user.InternshipApproved);
                    return item.user.InternshipApproved === null || item.user.InternshipApproved === undefined;
                });
    
                const approvedFiltered = data.filter((item: PreScreening) => item.user.InternshipApproved === true);
                const declinedFiltered = data.filter((item: PreScreening) => item.user.InternshipApproved === false);

                console.log('PreScreening Filtered:', preScreeningFiltered);
                console.log('Approved Filtered:', approvedFiltered);
                console.log('Declined Filtered:', declinedFiltered);

                setPreScreenings(preScreeningFiltered);
                setApprovedStudents(approvedFiltered);
                setDeclinedStudents(declinedFiltered);
                setTotalStudents(data.length);
            } catch (error) {
                console.error('Error fetching pre-screening data:', error);
            }
        };

        fetchPreScreenings();
    }, []);

    const handlePreScreeningToggle = () => {
        console.log('Pre-Screening toggle button clicked');
        setIsPreScreeningOpen(prev => !prev);
    };

    const handleApprove = async (userId: number) => {
        console.log('Approving user:', userId);
        try {
            await axios.post('/api/approval/sendMail', { userId, action: 'approve' });
            console.log('Approval email sent for user:', userId);
            
            // Update the InternshipApproved status of the user in the backend
            await axios.patch(`/api/users/${userId}`, { InternshipApproved: true });
            
            setPreScreenings(prev => prev.filter(screening => screening.user.id !== userId));
            setApprovedStudents(prev => [
                ...prev,
                ...preScreenings.filter(screening => screening.user.id === userId)
            ]);
            alert('Approval email sent successfully');
        } catch (error) {
            console.error('Error sending approval email:', error);
        }
    };
    
    const handleDecline = async (userId: number) => {
        console.log('Declining user:', userId);
        try {
            await axios.post('/api/approval/sendMail', { userId, action: 'decline' });
            console.log('Decline email sent for user:', userId);
            
            // Update the InternshipApproved status of the user in the backend
            await axios.patch(`/api/users/${userId}`, { InternshipApproved: false });
            
            setPreScreenings(prev => prev.filter(screening => screening.user.id !== userId));
            setDeclinedStudents(prev => [
                ...prev,
                ...preScreenings.filter(screening => screening.user.id === userId)
            ]);
            alert('Decline email sent successfully');
        } catch (error) {
            console.error('Error sending decline email:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-purple-600 text-black p-4 shadow-md">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Internship Facilitator Dashboard</h1>
                </div>
            </header>
            <main className="flex-1 p-6">
                <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Total Students: {totalStudents}</h2>

                    <div 
                        className={`bg-purple-50 p-4 rounded-lg shadow-sm cursor-pointer ${isPreScreeningOpen ? 'bg-purple-100' : ''}`}
                        onClick={handlePreScreeningToggle}
                    >
                        <h3 className="text-lg font-semibold text-purple-600">Pre Screening</h3>
                        <p className="text-gray-700 mt-2">Track and manage internship details for all students. View summaries and updates.</p>
                        {isPreScreeningOpen && (
                            <div className="mt-4">
                                {preScreenings.length > 0 ? (
                                    preScreenings.map((screening) => (
                                        <div key={screening.id} className="mb-4 p-4 border rounded-lg">
                                            <h4 className="font-semibold">{screening.user.name} ({screening.user.email})</h4>
                                            <p><strong>Tenth Board:</strong> {screening.tenthBoard}</p>
                                            <p><strong>Tenth Year:</strong> {screening.tenthYear}</p>
                                            <p><strong>Tenth Percentage:</strong> {screening.tenthPercentage}</p>
                                            <p><strong>Twelfth Board:</strong> {screening.twelfthBoard}</p>
                                            <p><strong>Degree University:</strong> {screening.degreeUniversity}</p>
                                            <p><strong>Last Sem Result:</strong> {screening.degreeLastSemResult}</p>
                                            <div className="mt-4">
                                                <button 
                                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                                    onClick={() => handleApprove(screening.user.id)}
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                    onClick={() => handleDecline(screening.user.id)}
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No students in pre-screening yet.</p>
                                )}
                            </div>
                        )}
                    </div>

                    
                </div>
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                {/* Footer content */}
            </footer>
        </div>
    );
};

export default InternshipDashboard;
