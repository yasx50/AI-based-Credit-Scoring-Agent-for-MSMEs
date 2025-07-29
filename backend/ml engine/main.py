from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from model import predict_from_list
from score_assesment import get_credit_assessment

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for specific origin
    allow_credentials=True,
    allow_methods=["*"],  # ["GET", "POST", ...] if you want to restrict
    allow_headers=["*"],  # ["Authorization", "Content-Type", ...]
)

# Input schema
class BusinessData(BaseModel):
    average_monthly_balance: float
    number_of_transactions: int
    number_of_gst_paid_transactions: int
    debt_to_capital: float
    operating_profit_margins: float
    use_of_overdraft: bool
    net_working_capital_days: int
    year_on_year_sales_growth: float
    emi_missed_count: int
    utility_bill_default: bool

@app.post("/predict")
async def predict(data: BusinessData):
    # Convert input into list format for prediction
    input_list = [
        data.average_monthly_balance,
        data.number_of_transactions,
        data.number_of_gst_paid_transactions,
        data.debt_to_capital,
        data.operating_profit_margins,
        data.use_of_overdraft,
        data.net_working_capital_days,
        data.year_on_year_sales_growth,
        data.emi_missed_count,
        data.utility_bill_default
    ]
    
    # Run prediction
    result = predict_from_list(input_list)
    
    # Get explanation
    explanation = get_credit_assessment(result["performance_score"])

    return {
        "input": input_list,
        "performance_score": result["performance_score"],
        "assessment": explanation
    }

# You can run it like this if using `uv run main.py`
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
