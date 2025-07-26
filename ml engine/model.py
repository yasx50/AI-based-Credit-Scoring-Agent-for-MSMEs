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
print(f"First 5 rows:\n{df.head()}")

print("\n" + "="*60)
print("DATA PREPROCESSING")
print("="*60)

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

print(f"\nTarget Statistics:")
print(f"Original Performance Score - Mean: {y.mean():.3f}, Range: {y.min():.3f} to {y.max():.3f}")
print(f"Logit-transformed Target - Mean: {y_logit.mean():.3f}, Range: {y_logit.min():.3f} to {y_logit.max():.3f}")

print("\n" + "="*60)
print("DATA SPLITTING")
print("="*60)

# Split the data: 70% train, 15% validation, 15% test
X_temp, X_test, y_temp, y_test = train_test_split(
    X, y_logit, test_size=0.15, random_state=42
)

X_train, X_val, y_train, y_val = train_test_split(
    X_temp, y_temp, test_size=0.176, random_state=42  # 0.176 * 0.85 ≈ 0.15 of total
)

print(f"Training set: {X_train.shape[0]} samples ({X_train.shape[0]/len(df)*100:.1f}%)")
print(f"Validation set: {X_val.shape[0]} samples ({X_val.shape[0]/len(df)*100:.1f}%)")
print(f"Test set: {X_test.shape[0]} samples ({X_test.shape[0]/len(df)*100:.1f}%)")

# Feature scaling
print(f"\nApplying feature scaling...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)
X_test_scaled = scaler.transform(X_test)

print("Feature scaling completed!")

print("\n" + "="*60)  
print("MODEL TRAINING")
print("="*60)

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

print(f"Linear Regression Training Results:")
print(f"  MAE: {train_mae:.4f}")
print(f"  RMSE: {train_rmse:.4f}")
print(f"  R²: {train_r2:.4f}")

print("\n" + "="*60)
print("MODEL VALIDATION")
print("="*60)

# Validation predictions
val_pred_logit = model.predict(X_val_scaled)
val_pred_sigmoid = sigmoid(val_pred_logit)

# Get original targets for evaluation
y_val_original = df.loc[X_val.index, 'Performance Score']

# Validation metrics
val_mae = mean_absolute_error(y_val_original, val_pred_sigmoid)
val_rmse = np.sqrt(mean_squared_error(y_val_original, val_pred_sigmoid))
val_r2 = r2_score(y_val_original, val_pred_sigmoid)

print(f"Validation Results:")
print(f"  MAE: {val_mae:.4f}")
print(f"  RMSE: {val_rmse:.4f}")
print(f"  R²: {val_r2:.4f}")

print("\n" + "="*60)
print("MODEL TESTING")
print("="*60)

# Test predictions
test_pred_logit = model.predict(X_test_scaled)
test_pred_sigmoid = sigmoid(test_pred_logit)

# Get original targets for evaluation
y_test_original = df.loc[X_test.index, 'Performance Score']

# Test metrics
test_mae = mean_absolute_error(y_test_original, test_pred_sigmoid)
test_rmse = np.sqrt(mean_squared_error(y_test_original, test_pred_sigmoid))
test_r2 = r2_score(y_test_original, test_pred_sigmoid)

print(f"Final Test Results:")
print(f"  MAE: {test_mae:.4f} (avg error of {test_mae*100:.1f}% on performance score)")
print(f"  RMSE: {test_rmse:.4f}")
print(f"  R²: {test_r2:.4f} (explains {test_r2*100:.1f}% of variance)")

# Model coefficients
feature_importance = pd.DataFrame({
    'Feature': X.columns,
    'Coefficient': model.coef_
}).sort_values('Coefficient', key=abs, ascending=False)

print(f"\nModel Coefficients (Feature Importance):")
print(feature_importance)

print("\n" + "="*60)
print("PREDICTION FUNCTION")
print("="*60)

def predict_business_performance(business_features, model=model, scaler=scaler, feature_names=X.columns):
    """
    Predict performance score for a single business using Linear Regression + Sigmoid
    
    Parameters:
    business_features: Dictionary with feature values
    model: Trained Linear Regression model
    scaler: Fitted StandardScaler
    feature_names: List of feature names in correct order
    
    Returns:
    performance_score: Float between 0 and 1
    """
    
    # Create feature vector in correct order
    feature_vector = []
    for feature in feature_names:
        if feature in business_features:
            feature_vector.append(business_features[feature])
        else:
            raise ValueError(f"Missing feature: {feature}")
    
    # Convert to numpy array and reshape
    feature_array = np.array(feature_vector).reshape(1, -1)
    
    # Scale features
    feature_scaled = scaler.transform(feature_array)
    
    # Make prediction (linear output)
    linear_output = model.predict(feature_scaled)[0]
    
    # Apply sigmoid to get 0-1 range
    performance_score = sigmoid(linear_output)
    
    return performance_score

def get_credit_assessment(performance_score):
    """
    Convert performance score to credit assessment
    
    Parameters:
    performance_score: Float between 0 and 1
    
    Returns:
    Dictionary with credit score, risk category, and recommendation
    """
    
    # Convert to traditional credit score (300-850)
    credit_score = int(300 + (performance_score * 550))
    
    # Risk categorization
    if performance_score >= 0.75:
        risk_category = "Excellent"
        risk_level = "Very Low Risk"
        recommendation = "Highly recommended for credit"
    elif performance_score >= 0.60:
        risk_category = "Good"
        risk_level = "Low Risk"
        recommendation = "Recommended for credit"
    elif performance_score >= 0.45:
        risk_category = "Fair"
        risk_level = "Medium Risk"
        recommendation = "Consider with conditions"
    elif performance_score >= 0.30:
        risk_category = "Poor"
        risk_level = "High Risk"
        recommendation = "Not recommended"
    else:
        risk_category = "Very Poor"
        risk_level = "Very High Risk"
        recommendation = "Strong rejection recommended"
    
    return {
        'performance_score': performance_score,
        'credit_score': credit_score,
        'risk_category': risk_category,
        'risk_level': risk_level,
        'recommendation': recommendation
    }



def test_individual_business():
    """
    Interactive function to test individual business performance
    """
    print("\nEnter business details for performance score prediction:")
    print("(Press Enter to use default values shown in brackets)")
    
    features = {}
    
    try:
        # Get user input for each feature
        features['Average Monthly Balance'] = float(
            input("Average Monthly Balance [50000]: ") or "50000"
        )
        
        features['Number of Transactions'] = int(
            input("Number of Transactions [100]: ") or "100"
        )
        
        features['Number of GST-paid Transactions'] = int(
            input("Number of GST-paid Transactions [80]: ") or "80"
        )
        
        features['Debt to Capital'] = float(
            input("Debt to Capital (0-1) [0.4]: ") or "0.4"
        )
        
        features['Operating Profit Margins'] = float(
            input("Operating Profit Margins (0-0.5) [0.15]: ") or "0.15"
        )
        
        features['Use of Overdraft'] = int(
            input("Use of Overdraft (0=No, 1=Yes) [0]: ") or "0"
        )
        
        features['Net Working Capital Days'] = int(
            input("Net Working Capital Days [60]: ") or "60"
        )
        
        features['Year on Year Sales Growth'] = float(
            input("Year on Year Sales Growth (-0.3 to 0.5) [0.1]: ") or "0.1"
        )
        
        features['EMI Missed Count'] = int(
            input("EMI Missed Count [0]: ") or "0"
        )
        
        features['Utility Bill Default on Payment Date'] = int(
            input("Utility Bill Default (0=No, 1=Yes) [0]: ") or "0"
        )
        
        # Make prediction
        performance_score = predict_business_performance(features)
        assessment = get_credit_assessment(performance_score)
        
        print(f"\n{'='*50}")
        print("PREDICTION RESULTS")
        print(f"{'='*50}")
        print(f"Performance Score: {assessment['performance_score']:.3f}")
        print(f"Credit Score (300-850): {assessment['credit_score']}")
        print(f"Risk Category: {assessment['risk_category']}")
        print(f"Risk Level: {assessment['risk_level']}")
        print(f"Recommendation: {assessment['recommendation']}")
        print(f"{'='*50}")
        
        return assessment
        
    except ValueError as e:
        print(f"Error: Invalid input. Please enter numeric values. {e}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None



# Uncomment the line below to run interactive testing immediately
# test_individual_business()