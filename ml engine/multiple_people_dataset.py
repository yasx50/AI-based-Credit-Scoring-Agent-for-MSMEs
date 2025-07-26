import pandas as pd
import numpy as np
import random
import string

# Set seed for reproducibility
np.random.seed(42)
random.seed(42)

def generate_cin():
    """Generate realistic CIN numbers"""
    prefix = random.choice(['L', 'U'])
    industry_code = random.randint(10000, 99999)
    state_code = random.choice(['DL', 'MH', 'KA', 'TN', 'GJ', 'UP', 'WB', 'RJ'])
    year = random.randint(1990, 2020)
    company_type = random.choice(['PTC', 'PLC', 'LLC'])
    serial = random.randint(100000, 999999)
    return f"{prefix}{industry_code}{state_code}{year}{company_type}{serial}"

def calculate_performance_score(row):
    """Calculate performance score based on business metrics with new weights"""
    score = 0.0  # Start from 0
    
    # Low Debt to Capital Ratio (10% weight) - Lower is better
    debt_score = max(0, 1 - row['Debt to Capital']) * 0.10
    
    # High Operating Profit Margins (25% weight) - Higher is better
    profit_score = min(1, row['Operating Profit Margins'] / 0.3) * 0.25
    
    # Positive Sales Growth (15% weight) - Positive growth is good
    growth_score = min(1, max(0, (row['Year on Year Sales Growth'] + 0.2) / 0.4)) * 0.15
    
    # No EMI defaults (20% weight) - No missed EMIs is better
    emi_score = max(0, 1 - (row['EMI Missed Count'] / 5)) * 0.20
    
    # No utility defaults (15% weight) - No defaults is better
    utility_score = 0.15 if not row['Utility Bill Default on Payment Date'] else 0
    
    # GST Compliance (10% weight) - Higher compliance is better
    gst_compliance = row['Number of GST-paid Transactions'] / max(1, row['Number of Transactions'])
    gst_score = gst_compliance * 0.10
    
    # Penalties for negative factors (5% total penalty)
    penalty = 0
    if row['Use of Overdraft']:
        penalty += 0.025
    
    if row['Net Working Capital Days'] > 100:
        penalty += 0.025
    
    # Calculate final score
    final_score = debt_score + profit_score + growth_score + emi_score + utility_score + gst_score - penalty
    
    return round(max(0.1, min(0.95, final_score)), 2)

# Generate 1000 business records
data = []

for i in range(1, 1001):
    # Generate correlated realistic business data
    
    # Base business size factor (affects multiple metrics)
    size_factor = np.random.lognormal(0, 1)
    
    # Average Monthly Balance (correlated with business size)
    avg_balance = round(np.random.normal(50000, 25000) * (size_factor / 2), 2)
    avg_balance = max(5000, min(200000, avg_balance))
    
    # Number of Transactions (correlated with balance and size)
    num_transactions = int(np.random.normal(100, 50) * (size_factor / 1.5))
    num_transactions = max(10, min(300, num_transactions))
    
    # GST-paid transactions (usually less than total, some correlation)
    gst_compliance_rate = np.random.beta(2, 1)  # Skewed towards higher compliance
    gst_transactions = int(num_transactions * gst_compliance_rate)
    
    # Debt to Capital (financial health indicator)
    debt_to_capital = round(np.random.beta(2, 2), 2)  # 0-1 range, bell-shaped
    
    # Operating Profit Margins (correlated with business health)
    profit_margin = round(np.random.gamma(2, 0.05), 2)  # Right-skewed, mostly positive
    profit_margin = min(0.35, profit_margin)
    
    # Use of Overdraft (more likely for businesses with cash flow issues)
    overdraft_prob = 0.3 + (debt_to_capital * 0.4)  # Higher debt increases overdraft probability
    use_overdraft = np.random.random() < overdraft_prob
    
    # Net Working Capital Days (operational efficiency)
    wc_days = int(np.random.normal(70, 30))
    wc_days = max(5, min(150, wc_days))
    
    # Year on Year Sales Growth (economic indicator)
    sales_growth = round(np.random.normal(0.1, 0.15), 2)  # Average 10% growth
    sales_growth = max(-0.3, min(0.5, sales_growth))
    
    # EMI Missed Count (credit risk indicator, correlated with debt)
    emi_prob = debt_to_capital * 0.3 + (0.1 if use_overdraft else 0)
    if np.random.random() < emi_prob:
        emi_missed = np.random.poisson(2) + 1
    else:
        emi_missed = 0
    emi_missed = min(emi_missed, 8)
    
    # Utility Bill Default (correlated with other payment issues)
    utility_default_prob = 0.15 + (emi_missed * 0.05) + (0.1 if use_overdraft else 0)
    utility_default = np.random.random() < utility_default_prob
    
    # Create record
    record = {
        'Company Name': f'Business_{i}',
        'CIN': generate_cin(),
        'Average Monthly Balance': avg_balance,
        'Number of Transactions': num_transactions,
        'Number of GST-paid Transactions': gst_transactions,
        'Debt to Capital': debt_to_capital,
        'Operating Profit Margins': profit_margin,
        'Use of Overdraft': use_overdraft,
        'Net Working Capital Days': wc_days,
        'Year on Year Sales Growth': sales_growth,
        'EMI Missed Count': emi_missed,
        'Utility Bill Default on Payment Date': utility_default
    }
    
    # Calculate performance score based on all metrics
    record['Performance Score'] = calculate_performance_score(record)
    
    data.append(record)

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv('business_dataset_1000.csv', index=False)

print("Dataset generated successfully!")
print(f"Total records: {len(df)}")
print("\nDataset Summary:")
print(df.describe())
print(f"\nPerformance Score Distribution:")
print(f"Mean: {df['Performance Score'].mean():.3f}")
print(f"Min: {df['Performance Score'].min():.3f}")
print(f"Max: {df['Performance Score'].max():.3f}")

# Display first 10 rows
print("\nFirst 10 rows:")
print(df.head(10).to_string(index=False))