import React from 'react'
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
} from 'lucide-react';
// import {result} from './FormInputField'

const ResultCard = () => {
  return (
    <>
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
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(result.assessment.credit_score)} mb-2`}>
                  {result.assessment.credit_score}
                </div>
                <p className="text-white text-lg font-semibold">Credit Score</p>
                <div className="w-full bg-white/20 rounded-full h-3 mt-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${result.assessment.credit_score}%` }}
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
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2">
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
      </div></>
  )
}

export default ResultCard