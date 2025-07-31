// File: src/components/FinancialForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

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

const Explain = () => {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e, field) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setResult(null);

  try {
    const payload = {
      average_monthly_balance: parseFloat(formData['Average Monthly Balance']),
      number_of_transactions: parseInt(formData['Number of Transactions']),
      number_of_gst_paid_transactions: parseInt(formData['Number of GST-paid Transactions']),
      debt_to_capital: parseFloat(formData['Debt to Capital']),
      operating_profit_margins: parseFloat(formData['Operating Profit Margins']),
      use_of_overdraft:
        formData['Use of Overdraft'] === 'true' || formData['Use of Overdraft'] === true,
      net_working_capital_days: parseInt(formData['Net Working Capital Days']),
      year_on_year_sales_growth: parseFloat(formData['Year on Year Sales Growth']),
      emi_missed_count: parseInt(formData['EMI Missed Count']),
      utility_bill_default:
        formData['Utility Bill Default on Payment Date'] === 'true' ||
        formData['Utility Bill Default on Payment Date'] === true,
    };

    const response = await axios.post('http://127.0.0.1:8000/predict', payload);
    setResult(response.data);
  } catch (err) {
    console.error(err);
    setError('Failed to fetch result. Please check the server.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-zinc-900 min-h-screen py-10 px-4 flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 w-full max-w-3xl rounded-xl p-8 shadow-xl border border-red-700"
      >
        <h2 className="text-3xl font-semibold text-red-500 mb-6 text-center">
          AI-based Credit Scoring Agent for MSMEs 
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fields.map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-zinc-300 text-sm mb-1">{field}</label>
              <input
                type={
                  field === 'Use of Overdraft' ||
                  field === 'Utility Bill Default on Payment Date'
                    ? 'checkbox'
                    : 'text'
                }
                placeholder={
                  field === 'Use of Overdraft' ||
                  field === 'Utility Bill Default on Payment Date'
                    ? undefined
                    : `Enter ${field}`
                }
                checked={
                  field === 'Use of Overdraft' ||
                  field === 'Utility Bill Default on Payment Date'
                    ? formData[field] || false
                    : undefined
                }
                value={
                  field === 'Use of Overdraft' ||
                  field === 'Utility Bill Default on Payment Date'
                    ? undefined
                    : formData[field] || ''
                }
                onChange={(e) => handleChange(e, field)}
                className="bg-zinc-700 border border-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded-md"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="mt-8 w-full max-w-3xl bg-zinc-800 text-white p-6 rounded-xl border border-green-600 shadow-lg">
          <h3 className="text-2xl font-semibold text-green-400 mb-4">Result</h3>
          <p>
            <span className="font-bold text-lg text-green-300">Credit Score:</span>{' '}
            <span className="font-bold text-xl">{result.assessment.credit_score}</span>
          </p>
          <p>
            <span className="text-gray-300">Risk Category:</span>{' '}
            <span className="text-yellow-400">{result.assessment.risk_category}</span>
          </p>
          <p>
            <span className="text-gray-300">Risk Level:</span>{' '}
            <span className="text-orange-400">{result.assessment.risk_level}</span>
          </p>
          <p>
            <span className="text-gray-300">Recommendation:</span>{' '}
            <span className="text-blue-400">{result.assessment.recommendation}</span>
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 text-red-500 bg-zinc-700 p-4 rounded-md max-w-3xl w-full">
          {error}
        </div>
      )}
    </div>
  );
};

export default Explain;
