from model import predict_from_list
from score_assesment import get_credit_assessment

# test_individual_business()
imput_list=[10753.07,37,26,0.39,0.05,True,87,-0.14,3,True]
result = predict_from_list(imput_list)
print(result)
explain = get_credit_assessment(result["performance_score"])
print(explain)