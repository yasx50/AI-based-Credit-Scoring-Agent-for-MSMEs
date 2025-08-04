import React, { useState } from 'react';
import {
  TrendingUp,
  Calculator,
  Shield,
  Brain,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  FileText,
  DollarSign,
  Database,
  Award,
  Zap,
  Download,
  Share2,
} from 'lucide-react';

// Mock fields data since it's imported from external file
const fields = [
  { name: 'Average Monthly Balance', type: 'number', step: '0.01', placeholder: '50000', unit: '₹', icon: DollarSign },
  { name: 'Number of Transactions', type: 'number', placeholder: '150', icon: Database },
  { name: 'Number of GST-paid Transactions', type: 'number', placeholder: '25', icon: Shield },
  { name: 'Debt to Capital', type: 'number', step: '0.01', placeholder: '0.3', unit: '%', icon: TrendingUp },
  { name: 'Operating Profit Margins', type: 'number', step: '0.01', placeholder: '15', unit: '%', icon: Calculator },
  { name: 'Use of Overdraft', type: 'checkbox', icon: AlertCircle },
  { name: 'Net Working Capital Days', type: 'number', placeholder: '45', icon: Database },
  { name: 'Year on Year Sales Growth', type: 'number', step: '0.01', placeholder: '12', unit: '%', icon: TrendingUp },
  { name: 'EMI Missed Count', type: 'number', placeholder: '0', icon: AlertCircle },
  { name: 'Utility Bill Default on Payment Date', type: 'checkbox', icon: Shield },
];

// Circular Progress Component
const CircularProgress = ({ score, size = 200 }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getStrokeColor = (score) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor(score)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${getStrokeColor(score)}40)`
          }}
        />
      </svg>
      {/* Score text in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-4xl font-bold ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
          {score}
        </div>
        <div className="text-white text-sm font-medium">Credit Score</div>
      </div>
    </div>
  );
};

const FormInputField = () => {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e, field) => {
    const value = field.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field.name]: value }));
  };

  // Mock API call for demonstration
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result based on form data
      const mockScore = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
      const mockResult = {
        assessment: {
          credit_score: mockScore,
          risk_category: mockScore >= 80 ? 'Low Risk' : mockScore >= 60 ? 'Medium Risk' : 'High Risk',
          risk_level: mockScore >= 80 ? 'Excellent' : mockScore >= 60 ? 'Good' : 'Poor',
          recommendation: mockScore >= 80 
            ? 'Approved for premium credit terms with competitive interest rates.'
            : mockScore >= 60
            ? 'Approved with standard terms. Consider improving financial metrics.'
            : 'Additional documentation required. Focus on debt reduction.'
        }
      };

      setResult(mockResult);
    } catch (err) {
      setError('Failed to fetch result. Please try again.');
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

  const downloadReport = () => {
    if (!result) return;

    const reportData = {
      creditScore: result.assessment.credit_score,
      riskCategory: result.assessment.risk_category,
      riskLevel: result.assessment.risk_level,
      recommendation: result.assessment.recommendation,
      generatedOn: new Date().toISOString(),
      formData: formData
    };

    // Create a detailed report content
    const reportContent = `
CREDIT ASSESSMENT REPORT
========================

Generated On: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

CREDIT SCORE: ${result.assessment.credit_score}/100
RISK CATEGORY: ${result.assessment.risk_category}
RISK LEVEL: ${result.assessment.risk_level}

RECOMMENDATION:
${result.assessment.recommendation}

FINANCIAL DATA SUBMITTED:
${Object.entries(formData).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

---
This report was generated by AI-powered credit assessment system.
For inquiries, please contact support.
    `.trim();

    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Credit_Assessment_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    if (!result) return;

    const shareText = `🎯 My Credit Assessment Results:
Credit Score: ${result.assessment.credit_score}/100
Risk Category: ${result.assessment.risk_category}
Risk Level: ${result.assessment.risk_level}

Generated by AI-powered financial assessment system.`;

    try {
      if (navigator.share) {
        // Use Web Share API if available (mobile browsers)
        await navigator.share({
          title: 'Credit Assessment Results',
          text: shareText,
          url: window.location.href
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareText);
        
        // Show a temporary notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
        notification.textContent = 'Results copied to clipboard!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback notification for share failure
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      notification.textContent = 'Unable to share. Please try again.';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 px-4 sm:px-6">
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
                        className={`w-full bg-white/5 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Why Choose Our AI Agent?
            </h3>
            <div className="space-y-4">
              {[
                ['Alternative Data Analysis', 'Beyond traditional credit scores'],
                ['Explainable AI', 'Transparent decision making'],
                ['Real-time Assessment', 'Instant credit scoring'],
              ].map(([title, desc], i) => (
                <div className="flex items-start space-x-3" key={i}>
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">{title}</p>
                    <p className="text-gray-300 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result && (
            <div
              className={`bg-gradient-to-r ${getScoreBg(result.assessment.credit_score)} backdrop-blur-sm border rounded-2xl p-8 animate-fade-in`}
            >
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
                {/* Circular Progress Section */}
                <div className="flex flex-col items-center">
                  <CircularProgress score={result.assessment.credit_score} size={180} />
                  <div className="mt-4 text-center">
                    <p className="text-gray-200 text-sm">Overall Assessment</p>
                    <div className="flex items-center justify-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-gray-300">Excellent (80+)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-xs text-gray-300">Good (60-79)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-xs text-gray-300">Poor (60-30)</span>
                      </div>
                    </div>
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
                  <button
                    onClick={downloadReport}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </button>
                  <button
                    onClick={shareResults}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105"
                  >
                    <Share2 className="w-4 h-4" />
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
    </div>
  );
};

export default FormInputField;