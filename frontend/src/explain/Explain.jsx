import React, { useState } from 'react';
import axios from 'axios';
import { TrendingUp, Calculator, Shield, Brain, CheckCircle, AlertCircle, ExternalLink, FileText, DollarSign, Database, Award, Zap } from 'lucide-react';

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
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field.name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Get API base URL from environment variables
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
      
      // Prepare payload for API
      const payload = {
        average_monthly_balance: parseFloat(formData['Average Monthly Balance']) || 0,
        number_of_transactions: parseInt(formData['Number of Transactions']) || 0,
        number_of_gst_paid_transactions: parseInt(formData['Number of GST-paid Transactions']) || 0,
        debt_to_capital: parseFloat(formData['Debt to Capital']) || 0,
        operating_profit_margins: parseFloat(formData['Operating Profit Margins']) || 0,
        use_of_overdraft: formData['Use of Overdraft'] === true || formData['Use of Overdraft'] === 'true',
        net_working_capital_days: parseInt(formData['Net Working Capital Days']) || 0,
        year_on_year_sales_growth: parseFloat(formData['Year on Year Sales Growth']) || 0,
        emi_missed_count: parseInt(formData['EMI Missed Count']) || 0,
        utility_bill_default: formData['Utility Bill Default on Payment Date'] === true || formData['Utility Bill Default on Payment Date'] === 'true',
      };

      console.log('Sending payload:', payload);

      // Make API call
      const response = await axios.post(`${apiBaseUrl}/predict`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      });

      console.log('API Response:', response.data);
      setResult(response.data);

    } catch (err) {
      console.error('API Error:', err);
      
      let errorMessage = 'Failed to fetch result. Please try again.';
      
      if (err.response) {
        // Server responded with error status
        errorMessage = `Server Error: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check if the API is running.';
      } else if (err.code === 'ECONNABORTED') {
        // Request timeout
        errorMessage = 'Request timeout. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
    if (score >= 60) return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
    return 'from-red-500/20 to-pink-500/20 border-red-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-6">
            <Brain className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-300 text-sm font-medium">AI-Powered Credit Assessment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Credit Scoring
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Agent</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced AI analysis for MSME creditworthiness assessment using alternative data sources
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">5 min</h3>
            <p className="text-gray-300">Quick Assessment</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">92%</h3>
            <p className="text-gray-300">Accuracy Rate</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">10K+</h3>
            <p className="text-gray-300">MSMEs Served</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Financial Assessment</h2>
                <p className="text-gray-300">Enter your business financial details</p>
              </div>
            </div>

            <div className="grid gap-6">
              {fields.map((field, idx) => (
                <div 
                  key={idx} 
                  className={`relative transition-all duration-300 ${activeField === field.name ? 'scale-[1.02]' : ''}`}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <div className="flex items-center space-x-2">
                      <field.icon className="w-4 h-4" />
                      <span>{field.name}</span>
                    </div>
                  </label>
                  
                  {field.type === 'checkbox' ? (
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData[field.name] || false}
                        onChange={(e) => handleChange(e, field)}
                        className="w-5 h-5 rounded border-2 border-blue-500 bg-transparent text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                      />
                      <span className="text-gray-300 text-sm">Yes</span>
                    </div>
                  ) : (
                    <div className="relative">
                      {field.unit && field.unit !== '%' && (
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                          {field.unit}
                        </span>
                      )}
                      <input
                        type={field.type}
                        step={field.step}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(e, field)}
                        onFocus={() => setActiveField(field.name)}
                        onBlur={() => setActiveField(null)}
                        className={`w-full bg-white/5 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                          field.unit && field.unit !== '%' ? 'pl-8' : ''
                        } ${activeField === field.name ? 'bg-white/10 border-blue-500/50' : ''}`}
                      />
                      {field.unit === '%' && (
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                          %
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>Generate Credit Score</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Feature Highlights */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Why Choose Our AI Agent?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Alternative Data Analysis</p>
                  <p className="text-gray-300 text-sm">Beyond traditional credit scores</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Explainable AI</p>
                  <p className="text-gray-300 text-sm">Transparent decision making</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Real-time Assessment</p>
                  <p className="text-gray-300 text-sm">Instant credit scoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* Result Display */}
          {result && (
            <div className={`bg-gradient-to-r ${getScoreBg(result.assessment.credit_score)} backdrop-blur-sm border rounded-2xl p-8 animate-fade-in`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Credit Assessment</h3>
                  <p className="text-gray-200">AI-powered analysis complete</p>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(result.assessment.credit_score)} mb-2`}>
                    {result.assessment.credit_score}
                  </div>
                  <p className="text-white text-lg font-semibold">Credit Score</p>
                  <div className="w-full bg-white/20 rounded-full h-3 mt-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                      style={{width: `${result.assessment.credit_score}%`}}
                    ></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-gray-200 text-sm mb-1">Risk Category</p>
                    <p className="text-white font-semibold">{result.assessment.risk_category}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-gray-200 text-sm mb-1">Risk Level</p>
                    <p className="text-white font-semibold">{result.assessment.risk_level}</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-gray-200 text-sm mb-2">Recommendation</p>
                  <p className="text-white font-semibold">{result.assessment.recommendation}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Download Report</span>
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Share Results</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="text-red-400 font-semibold">Assessment Failed</h4>
                  <p className="text-gray-300">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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