import pandas as pd
import numpy as np
from faker import Faker
import random
from bank_statement_data import bankstatements


# Load original data (1-year transaction of 1 user)
original_df = bankstatements

# Add faker
fake = Faker()

# Create list to hold all synthetic user data
all_users_data = []

# Number of synthetic users
num_users = 1000

for user_id in range(1, num_users + 1):
    # Deep copy the original data
    user_df = original_df.copy()
    
    # Assign a unique customer ID
    user_df['customer_id'] = f"USER_{user_id:04d}"
    
    # Slightly modify the transaction amount and balance
    user_df['amount'] = user_df['amount'].apply(lambda x: round(x * np.random.uniform(0.9, 1.1), 2))
    user_df['balance'] = user_df['balance'].apply(lambda x: round(x * np.random.uniform(0.95, 1.05), 2))
    
    # Randomly change mode
    modes = ['ATM', 'UPI', 'NETBANKING', 'CHEQUE', 'IMPS']
    user_df['mode'] = user_df['mode'].apply(lambda x: random.choice(modes))
    
    # Randomize name (or keep NaN)
    user_df['name'] = user_df['name'].apply(lambda x: fake.first_name().upper() if pd.notna(x) else np.nan)
    
    # Optionally shuffle date slightly (add random days)
    user_df['date'] = pd.to_datetime(user_df['date'])
    user_df['date'] = user_df['date'] + pd.to_timedelta(np.random.randint(-3, 3), unit='D')
    
    # Recompute Day, Month, Year, Tday
    user_df['Day'] = user_df['date'].dt.day
    user_df['Month'] = user_df['date'].dt.month
    user_df['Year'] = user_df['date'].dt.year
    user_df['Tday'] = np.arange(1, len(user_df) + 1)
    
    all_users_data.append(user_df)

# Combine all user data into one DataFrame
combined_df = pd.concat(all_users_data, ignore_index=True)

# Shuffle all rows for randomness
combined_df = combined_df.sample(frac=1).reset_index(drop=True)

# Save to CSV
combined_df.to_csv("synthetic_1000_users_transactions.csv", index=False)
print("✅ Saved: synthetic_1000_users_transactions.csv")
