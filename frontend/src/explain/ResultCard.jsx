import { Award, FileText, ExternalLink } from 'lucide-react';
import { getScoreRingColor } from '../utils';

const ResultCard = ({ result }) => {
  const score = result?.assessment?.credit_score || 0;
  const ringColor = getScoreRingColor(score);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Credit Assessment</h3>
          <p className="text-gray-200">AI-powered analysis complete</p>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full ring-4 ${ringColor}`}>
          <span className="text-4xl font-bold text-white">{score}</span>
        </div>
        <p className="text-white text-lg font-semibold">Credit Score (300–900)</p>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500 h-2 rounded-full transition-all duration-700"
            style={{ width: `${((score - 300) / 600) * 100}%` }}
          />
        </div>
      </div>

      {/* Recommendation Details */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-gray-200 text-sm mb-1">Risk Category</p>
          <p className="text-white font-semibold">{result.assessment.risk_category}</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-gray-200 text-sm mb-1">Risk Level</p>
          <p className="text-white font-semibold">{result.assessment.risk_level}</p>
        </div>
        <div className="md:col-span-2 bg-white/10 rounded-xl p-4">
          <p className="text-gray-200 text-sm mb-2">Recommendation</p>
          <p className="text-white font-semibold">{result.assessment.recommendation}</p>
        </div>
      </div>

      {/* Actions */}
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
  );
};

export default ResultCard;
