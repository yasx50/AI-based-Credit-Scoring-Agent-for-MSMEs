// File: src/components/FinancialForm.jsx

import React, { useState } from 'react';

const fields = [
  'Average Monthly Balance',
  'Number of Transactions',
  'Number of GST-paid Transactions',
  'Debt to Capital',
  'Operating Profit Margins',
  'Use of Overdraft',
  'Net Working Capital Days',
  'Year on Year Sales Growth',
  'EMI Missed Count',
  'Utility Bill Default on Payment Date',
];

const App = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your logic here to send data
  };

  return (
    <div className="bg-zinc-900 min-h-screen py-10 px-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 w-full max-w-3xl rounded-xl p-8 shadow-xl border border-red-700"
      >
        <h2 className="text-3xl font-semibold text-red-500 mb-6 text-center">
          Financial Input Form
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fields.map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-zinc-300 text-sm mb-1">{field}</label>
              <input
                type="text"
                placeholder={`Enter ${field}`}
                value={formData[field] || ''}
                onChange={(e) => handleChange(e, field)}
                className="bg-zinc-700 border border-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App ;
