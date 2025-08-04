import { TrendingUp, Calculator, Shield, Brain, CheckCircle, AlertCircle, ExternalLink, FileText, DollarSign, Database, Award, Zap } from 'lucide-react';

export const  fields = [
  { name: 'Average Monthly Balance', type: 'number', step: '0.01', placeholder: 'e.g., 39655.51', unit: '₹', icon: DollarSign },
  { name: 'Number of Transactions', type: 'number', placeholder: 'e.g., 194', icon: TrendingUp },
  { name: 'Number of GST-paid Transactions', type: 'number', placeholder: 'e.g., 120', icon: FileText },
  { name: 'Debt to Capital', type: 'number', step: '0.01', placeholder: 'e.g., 0.21', icon: Database },
  { name: 'Operating Profit Margins', type: 'number', step: '0.01', placeholder: 'e.g., 0.04', icon: Calculator, unit: '%' },
  { name: 'Use of Overdraft', type: 'checkbox', icon: Shield },
  { name: 'Net Working Capital Days', type: 'number', placeholder: 'e.g., 80', icon: Award },
  { name: 'Year on Year Sales Growth', type: 'number', step: '0.01', placeholder: 'e.g., 0.18', icon: TrendingUp, unit: '%' },
  { name: 'EMI Missed Count', type: 'number', placeholder: 'e.g., 0', icon: FileText },
  { name: 'Utility Bill Default on Payment Date', type: 'checkbox', icon: AlertCircle },
];