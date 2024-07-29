// src/components/PaymentComponent.tsx
import React, { useState } from 'react';

const PaymentComponent = () => {
  const [name, setName] = useState('');
  const [paymentMode, setPaymentMode] = useState('creditCard');
  const [utrNo, setUtrNo] = useState('');
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Name:', name);
    console.log('Payment Mode:', paymentMode);
    console.log('UTR No:', utrNo);
    console.log('Reference File:', referenceFile);

    setIsSubmitted(true);
  };

  return (
    <div className="flex space-x-8 p-8 bg-white rounded-lg shadow-xl">
      {/* QR Code Block */}
      <div className="relative w-1/2 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 blur-sm"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
          <div className="w-32 h-32 bg-gray-500 flex items-center justify-center rounded-full">
            <span className="text-white text-lg font-bold">QR Code</span>
          </div>
          <p className="mt-4 text-white text-xl font-semibold">
            Payment Details will be updated soon
          </p>
        </div>
      </div>

      {/* Form Block */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="paymentMode" className="text-sm font-medium text-gray-700">Payment Mode</label>
            <select
              id="paymentMode"
              name="paymentMode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">UPI</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="utrNo" className="text-sm font-medium text-gray-700">UTR No</label>
            <input
              type="text"
              id="utrNo"
              name="utrNo"
              value={utrNo}
              onChange={(e) => setUtrNo(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="referenceFile" className="text-sm font-medium text-gray-700">Reference File</label>
            <input
              type="file"
              id="referenceFile"
              name="referenceFile"
              onChange={(e) => setReferenceFile(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-3"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        {isSubmitted && (
          <p className="mt-6 text-green-600 font-semibold">Thanks for your payment, we'll get back to you soon.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;
