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
