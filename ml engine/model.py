import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import warnings
warnings.filterwarnings('ignore')

def sigmoid(x):
    """Sigmoid function to map output to 0-1 range"""
    return 1 / (1 + np.exp(-x))

# Load the dataset
df = pd.read_csv('business_dataset_1000.csv')
print("Dataset loaded successfully!")
print(f"Dataset shape: {df.shape}")


# Prepare features and target
X = df.drop(['Company Name', 'CIN', 'Performance Score'], axis=1)
y = df['Performance Score']

# Convert boolean columns to numeric
X['Use of Overdraft'] = X['Use of Overdraft'].astype(int)
X['Utility Bill Default on Payment Date'] = X['Utility Bill Default on Payment Date'].astype(int)

print(f"Features: {list(X.columns)}")
print(f"Feature matrix shape: {X.shape}")
print(f"Target vector shape: {y.shape}")

# Transform target to logit space (inverse sigmoid)
# Since y is already in 0-1 range, we need to apply logit transformation
epsilon = 1e-7  # Small value to avoid log(0)
y_clipped = np.clip(y, epsilon, 1 - epsilon)
y_logit = np.log(y_clipped / (1 - y_clipped))

# print(f"\nTarget Statistics:")
# print(f"Original Performance Score - Mean: {y.mean():.3f}, Range: {y.min():.3f} to {y.max():.3f}")
# print(f"Logit-transformed Target - Mean: {y_logit.mean():.3f}, Range: {y_logit.min():.3f} to {y_logit.max():.3f}")


# Split the data: 70% train, 15% validation, 15% test
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y_logit, test_size=0.15, random_state=42
)

X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=0.176, random_state=42  # 0.176 * 0.85 ≈ 0.15 of total
)

# print(f"Training set: {X_train.shape[0]} samples ({X_train.shape[0]/len(df)*100:.1f}%)")
# print(f"Validation set: {X_val.shape[0]} samples ({X_val.shape[0]/len(df)*100:.1f}%)")
# print(f"Test set: {X_test.shape[0]} samples ({X_test.shape[0]/len(df)*100:.1f}%)")


scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)
X_test_scaled = scaler.transform(X_test)


# Initialize and train Linear Regression model
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Training predictions (apply sigmoid to get 0-1 range)
train_pred_logit = model.predict(X_train_scaled)
train_pred_sigmoid = sigmoid(train_pred_logit)

# Get original targets for evaluation
y_train_original = df.loc[X_train.index, 'Performance Score']

# Training metrics
train_mae = mean_absolute_error(y_train_original, train_pred_sigmoid)
train_rmse = np.sqrt(mean_squared_error(y_train_original, train_pred_sigmoid))
train_r2 = r2_score(y_train_original, train_pred_sigmoid)

# print(f"Linear Regression Training Results:")
# print(f"  MAE: {train_mae:.4f}")
# print(f"  RMSE: {train_rmse:.4f}")
# print(f"  R²: {train_r2:.4f}")

# print("\n" + "="*60)
# print("MODEL VALIDATION")
# print("="*60)

# Validation predictions
val_pred_logit = model.predict(X_val_scaled)
val_pred_sigmoid = sigmoid(val_pred_logit)

# Get original targets for evaluation
y_val_original = df.loc[X_val.index, 'Performance Score']

# Validation metrics
val_mae = mean_absolute_error(y_val_original, val_pred_sigmoid)
val_rmse = np.sqrt(mean_squared_error(y_val_original, val_pred_sigmoid))
val_r2 = r2_score(y_val_original, val_pred_sigmoid)

# print(f"Validation Results:")
# print(f"  MAE: {val_mae:.4f}")
# print(f"  RMSE: {val_rmse:.4f}")
# print(f"  R²: {val_r2:.4f}")

# print("\n" + "="*60)
# print("MODEL TESTING")
# print("="*60)

# Test predictions
test_pred_logit = model.predict(X_test_scaled)
test_pred_sigmoid = sigmoid(test_pred_logit)

# Get original targets for evaluation
y_test_original = df.loc[X_test.index, 'Performance Score']

# Test metrics
test_mae = mean_absolute_error(y_test_original, test_pred_sigmoid)
test_rmse = np.sqrt(mean_squared_error(y_test_original, test_pred_sigmoid))
test_r2 = r2_score(y_test_original, test_pred_sigmoid)

# print(f"Final Test Results:")
# print(f"  MAE: {test_mae:.4f} (avg error of {test_mae*100:.1f}% on performance score)")
# print(f"  RMSE: {test_rmse:.4f}")
# print(f"  R²: {test_r2:.4f} (explains {test_r2*100:.1f}% of variance)")

# Model coefficients
feature_importance = pd.DataFrame({
    'Feature': X.columns,
    'Coefficient': model.coef_
}).sort_values('Coefficient', key=abs, ascending=False)



def predict_from_list(input_list):
    
    
    if len(input_list) != 10:
        raise ValueError(f"Expected 10 values, got {len(input_list)}")
    
    # Convert input values to correct types
    try:
        avg_balance = float(input_list[0])
        num_transactions = int(float(input_list[1]))
        gst_transactions = int(float(input_list[2]))
        debt_ratio = float(input_list[3])
        profit_margin = float(input_list[4])
        
        # Handle boolean conversion for overdraft
        if isinstance(input_list[5], bool):
            use_overdraft = int(input_list[5])
        elif str(input_list[5]).lower() in ['true', '1', 'yes']:
            use_overdraft = 1
        else:
            use_overdraft = 0
            
        wc_days = int(float(input_list[6]))
        sales_growth = float(input_list[7])
        emi_missed = int(float(input_list[8]))
        
        # Handle boolean conversion for utility default
        if isinstance(input_list[9], bool):
            utility_default = int(input_list[9])
        elif str(input_list[9]).lower() in ['true', '1', 'yes']:
            utility_default = 1
        else:
            utility_default = 0
        
    except (ValueError, IndexError) as e:
        raise ValueError(f"Invalid input format: {e}")
    
    # Create feature array in correct order
    feature_array = np.array([
        avg_balance, num_transactions, gst_transactions, debt_ratio, profit_margin,
        use_overdraft, wc_days, sales_growth, emi_missed, utility_default
    ]).reshape(1, -1)
    
    # Scale features
    feature_scaled = scaler.transform(feature_array)
    
    # Make prediction (linear output)
    linear_output = model.predict(feature_scaled)[0]
    
    # Apply sigmoid to get 0-1 range
    performance_score = sigmoid(linear_output)
    
    # Get complete credit assessment
    credit_score = int(300 + (performance_score * 550))
    
    
    return {
        'performance_score': round(performance_score, 3),
        'credit_score': credit_score,
        
    }



