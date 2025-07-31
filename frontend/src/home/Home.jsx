import React, { useState, useEffect } from 'react';
import { ChevronRight, Database, Brain, Shield, TrendingUp, Users, CheckCircle, Target, Lightbulb, ArrowRight, BarChart3, FileText, DollarSign, Award } from 'lucide-react';

const Home = () => {
  const [activeSection, setActiveSection] = useState('problem');
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { id: 'problem', label: 'Problem', icon: Target },
    { id: 'solution', label: 'Our Solution', icon: Lightbulb },
    { id: 'architecture', label: 'Architecture', icon: Database },
    { id: 'benefits', label: 'Benefits', icon: TrendingUp },
    { id: 'team', label: 'Team', icon: Users }
  ];

  const dataSourcesFlow = [
    { name: 'GST Portal', icon: FileText, color: 'bg-blue-500' },
    { name: 'Account Aggregator', icon: Database, color: 'bg-green-500' },
    { name: 'UPI/POS Payments', icon: DollarSign, color: 'bg-purple-500' },
    { name: 'Tally/Vyapar', icon: BarChart3, color: 'bg-orange-500' }
  ];

  const techStack = [
    { layer: 'Frontend', tech: 'React.js + Tailwind CSS', color: 'bg-cyan-500' },
    { layer: 'Backend', tech: 'Node.js (Express)', color: 'bg-green-500' },
    { layer: 'ML Engine', tech: 'Python + XGBoost + SHAP', color: 'bg-purple-500' },
    { layer: 'Database', tech: 'PostgreSQL', color: 'bg-blue-500' },
    { layer: 'Storage', tech: 'MinIO / AWS S3', color: 'bg-orange-500' },
    { layer: 'Deployment', tech: 'Docker + EC2', color: 'bg-red-500' }
  ];

  const benefits = [
    'Enables credit access to non-traditional MSMEs',
    'No collateral required',
    'Improves loan disbursement decisions',
    'Promotes data-driven and explainable finance',
    'Evolves with repayment feedback loop'
  ];

  const futureScope = [
    'Integration with credit bureaus for hybrid scoring',
    'Use of AI chat agent to guide MSMEs on improving score',
    'Integration with NBFC lending platforms',
    'Use of blockchain for audit trail & data trust'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-6">
              <Brain className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-300 text-sm font-medium">AI-Powered Financial Innovation</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AI-based Credit Scoring
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Agent</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing MSME lending through intelligent alternative data analysis and explainable AI
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-white font-semibold">MSMEs Empowered</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-white font-semibold">AI-Driven Insights</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-white font-semibold">Explainable Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-8 py-4">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === id
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Problem Statement */}
        {activeSection === 'problem' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">The Challenge We're Solving</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Traditional credit scoring creates barriers for financially sound MSMEs
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Current Problems</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Heavy reliance on collateral and CIBIL scores</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">MSMEs with healthy cashflows get rejected</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Lack of traditional documentation hurts applications</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Financial exclusion of economically viable businesses</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Objectives</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Use alternative data sources for scoring</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Analyze cash flow patterns and digital transactions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Generate explainable credit scores</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Continuously improve based on repayment behavior</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Solution */}
        {activeSection === 'solution' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Our Intelligent Solution</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                An AI-driven approach leveraging alternative data for comprehensive credit assessment
              </p>
            </div>

            {/* Data Sources Flow */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Data Collection Sources</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {dataSourcesFlow.map((source, index) => (
                  <div key={source.name} className="relative">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                      <div className={`w-12 h-12 ${source.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                        <source.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-white font-semibold">{source.name}</h4>
                    </div>
                    {index < dataSourcesFlow.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ML Process */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Feature Engineering</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Monthly cash flow analysis</li>
                  <li>• GST filing behavior patterns</li>
                  <li>• Sales/Expense consistency</li>
                  <li>• Transaction volume and modes</li>
                </ul>
              </div>

              <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">ML Model Training</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• XGBoost/LightGBM algorithms</li>
                  <li>• Labeled with repayment behavior</li>
                  <li>• SHAP values for explainability</li>
                  <li>• Continuous learning capability</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Output Generation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Credit Score (0-100)</li>
                  <li>• Risk Category classification</li>
                  <li>• Top 3 contributing factors</li>
                  <li>• Detailed explanations</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Architecture */}
        {activeSection === 'architecture' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">System Architecture</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Scalable, secure, and intelligent architecture designed for enterprise-grade performance
              </p>
            </div>

            {/* Tech Stack */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Technology Stack</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techStack.map((tech, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <div className={`w-3 h-3 ${tech.color} rounded-full mr-3`}></div>
                      <h4 className="text-white font-semibold">{tech.layer}</h4>
                    </div>
                    <p className="text-gray-300">{tech.tech}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Flow */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Data Flow Architecture</h3>
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {[
                  'User Data Upload',
                  'Backend Processing',
                  'ML Inference',
                  'Score Generation',
                  'Dashboard Display'
                ].map((step, index, array) => (
                  <React.Fragment key={step}>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center min-w-[150px]">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium text-sm">{step}</span>
                    </div>
                    {index < array.length - 1 && (
                      <ChevronRight className="w-6 h-6 text-gray-400 transform rotate-90 md:rotate-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Benefits */}
        {activeSection === 'benefits' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Impact & Benefits</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Transforming the lending landscape for MSMEs and financial institutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Key Benefits</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Future Scope</h3>
                <div className="space-y-4">
                  {futureScope.map((scope, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-300">{scope}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Project Conclusion</h3>
              <p className="text-gray-300 text-lg leading-relaxed text-center max-w-5xl mx-auto">
                The proposed AI-based credit scoring system aims to revolutionize MSME lending by leveraging alternative data sources beyond traditional collateral and credit scores. By intelligently analyzing GST returns, bank transactions, UPI/POS payments, and accounting data, the system offers a reliable, explainable, and data-driven creditworthiness assessment. This approach not only enables financial inclusion for underserved businesses but also empowers lenders with actionable insights and reduced risk.
              </p>
            </div>
          </div>
        )}

        {/* Team */}
        {activeSection === 'team' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Project Stakeholders</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Meet the team driving innovation in MSME credit scoring
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Shrey Shukla</h3>
                <p className="text-blue-400 font-semibold mb-4">Business Analyst</p>
                <p className="text-gray-300">
                  Responsible for market research, stakeholder analysis, and business requirements definition for the MSME credit scoring solution.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Yash Yadav</h3>
                <p className="text-green-400 font-semibold mb-4">Software Developer</p>
                <p className="text-gray-300">
                  Leading the technical development, ML model implementation, and system architecture for the AI-based credit scoring platform.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Project Vision</h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Together, we're committed to democratizing access to credit for MSMEs through innovative AI solutions, 
                creating a more inclusive financial ecosystem that recognizes the true potential of small and medium enterprises.
              </p>
            </div>
          </div>
        )}
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

export default Home;