import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinanceDashboard: React.FC = () => {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('/api/payments/all'); // Ensure this matches your backend endpoint
                setPayments(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching payments');
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const handleVerify = async (paymentId: number, userId: number, action: 'approve' | 'decline') => {
        try {
            await axios.post('/api/verify-payment/verify', { paymentId, userId, action });
            // Optionally, fetch payments again or update state
            setPayments(payments.map(payment =>
                payment.id === paymentId ? { ...payment, status: action === 'approve' ? 'verified' : 'declined' } : payment
            ));
        } catch (error) {
            console.error('Error verifying payment:', error);
            setError('Error verifying payment');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-green-600 text-black p-4 shadow-md">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Finance Admin Dashboard</h1>
                </div>
            </header>
            <main className="flex-1 p-6">
                <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">New Payment</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-2 px-4 border-b text-left">Name</th>
                                        <th className="py-2 px-4 border-b text-left">Payment Mode</th>
                                        <th className="py-2 px-4 border-b text-left">UTR No</th>
                                        <th className="py-2 px-4 border-b text-left">User ID</th>
                                        <th className="py-2 px-4 border-b text-left">Date</th>
                                        <th className="py-2 px-4 border-b text-left">Status</th>
                                        <th className="py-2 px-4 border-b text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map(payment => (
                                        <tr key={payment.id}>
                                            <td className="py-2 px-4 border-b">{payment.name}</td>
                                            <td className="py-2 px-4 border-b">{payment.paymentMode}</td>
                                            <td className="py-2 px-4 border-b">{payment.utrNo}</td>
                                            <td className="py-2 px-4 border-b">{payment.userId}</td>
                                            <td className="py-2 px-4 border-b">{new Date(payment.createdAt).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 border-b">{payment.status}</td>
                                            <td className="py-2 px-4 border-b">
                                                <button
                                                    onClick={() => handleVerify(payment.id, payment.userId, 'approve')}
                                                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleVerify(payment.id, payment.userId, 'decline')}
                                                    className="bg-red-500 text-white py-1 px-3 rounded"
                                                >
                                                    Decline
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                {/* Footer content */}
            </footer>
        </div>
    );
};

export default FinanceDashboard;
