import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            if (!token) {
                console.log('No token found, redirecting to login...');
                navigate('/login');
                return;
            }

            try {
                console.log('Sending request to /api/dashboard with token...');
                const response = await axios.get('/api/dashboard/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Response received from /api/dashboard:', response.data);

                switch (response.data.roleId) {
                    case 1:
                        console.log('Navigating to /finance...');
                        navigate('/finance');
                        break;
                    case 2:
                        console.log('Navigating to /internship...');
                        navigate('/internship');
                        break;
                    case 3:
                        console.log('Navigating to /management...');
                        navigate('/management');
                        break;
                    case 4:
                        console.log('Navigating to /faculty...');
                        navigate('/faculty');
                        break;
                    default:
                        console.log('Invalid roleId, redirecting to login...');
                        navigate('/login');
                        break;
                }
            } catch (err) {
                console.error('Failed to fetch dashboard', err);
                navigate('/login');
            }
        };

        fetchDashboard();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Dashboard;
