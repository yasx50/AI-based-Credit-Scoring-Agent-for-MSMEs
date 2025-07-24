# 🧠 AI-Based Credit Scoring System for MSMEs

An intelligent credit scoring platform that evaluates the creditworthiness of MSMEs using **alternative data sources** such as GST returns, bank transactions, UPI/POS data, and accounting platforms like Tally or Vyapar.

---

## 🚀 Project Objective

To enable financial inclusion for underserved MSMEs by providing an AI-driven, explainable, and data-backed credit scoring solution, without the need for traditional collateral or CIBIL scores.

---

## 🧩 Features

- ✅ Data ingestion from GST, Account Aggregator, and accounting apps
- ✅ Feature engineering on cash flow, compliance, and transaction patterns
- ✅ ML-based credit scoring (XGBoost/LightGBM)
- ✅ Explainable AI using SHAP values
- ✅ REST API and Dashboard for banks/NBFCs
- ✅ Continuous improvement using repayment behavior

---

## 🔗 Data Sources

- **GST Returns** (via GSP APIs)
- **Bank/UPI/POS Transactions** (via Account Aggregator)
- **Accounting Platforms** (Tally, Vyapar)

---

## 🧠 ML Pipeline

1. **Data Preprocessing**
2. **Feature Engineering**
3. **Model Training** (XGBoost/LightGBM)
4. **Score Generation**
5. **Explainability** (SHAP)
6. **Risk Categorization** (Low / Medium / High)

---

## 📊 Output Format

```json
{
  "credit_score": 82,
  "risk_category": "Low",
  "top_factors": [
    {"feature": "Monthly Cash Flow", "impact": "+15"},
    {"feature": "GST Filing Timeliness", "impact": "+10"},
    {"feature": "POS Usage Ratio", "impact": "+7"}
  ]
}
