import React, { useState } from 'react';
import axios from 'axios';

const fields = [
  { name: 'Average Monthly Balance', type: 'number', icon: DollarSign, placeholder: '50000', unit: '₹' },
  { name: 'Number of Transactions', type: 'number', icon: Database, placeholder: '150' },
  { name: 'Number of GST-paid Transactions', type: 'number', icon: FileText, placeholder: '25' },
  { name: 'Debt to Capital', type: 'number', icon: TrendingUp, placeholder: '0.3', step: '0.01' },
  { name: 'Operating Profit Margins', type: 'number', icon: TrendingUp, placeholder: '15.5', step: '0.1', unit: '%' },
  { name: 'Use of Overdraft', type: 'checkbox', icon: Shield },
  { name: 'Net Working Capital Days', type: 'number', icon: Calculator, placeholder: '30' },
  { name: 'Year on Year Sales Growth', type: 'number', icon: TrendingUp, placeholder: '12.5', step: '0.1', unit: '%' },
  { name: 'EMI Missed Count', type: 'number', icon: AlertCircle, placeholder: '0' },
  { name: 'Utility Bill Default on Payment Date', type: 'checkbox', icon: AlertCircle },
];

const EnhancedFinancialForm = () => {
  

  return (
    <div className="">
     

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EnhancedFinancialForm;