from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
from fastapi.middleware.cors import CORSMiddleware
import torch

# Initialize FastAPI app
app = FastAPI()

# Load the GPT-2 model and tokenizer
model_name = "gpt2"  # You can also try "EleutherAI/gpt-neo-2.7B" for better results
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Request model
class DiseaseRequest(BaseModel):
    disease: str

# def generate_meal_plan(disease: str):
#     """
#     Generate a healthy meal plan based on the specified disease.
#     """
#     prompt = f"Suggest a healthy meal plan for a person with {disease}. Include breakfast, lunch, and dinner options, considering dietary restrictions."
    
#     inputs = tokenizer(prompt, return_tensors="pt")
    
#     with torch.no_grad():
#         outputs = model.generate(inputs['input_ids'], max_length=1000, num_return_sequences=1, no_repeat_ngram_size=2, temperature=0.7)
#         print(outputs)
#     response = tokenizer.decode(outputs[0], skip_special_tokens=True)
#     print(response)
#     return response


def generate_meal_plan(disease: str):
    # Refined prompt for better meal plan suggestions
    prompt = f"Create a detailed healthy meal plan for a person with {disease}. The plan should include breakfast, lunch, and dinner, focusing on heart-healthy foods. Avoid saturated fats, trans fats, and excessive sodium. Prioritize foods that support heart health, such as fruits, vegetables, whole grains, lean proteins, and healthy fats."
    
    # Tokenize the input
    inputs = tokenizer(prompt, return_tensors="pt")
    
    # Generate the meal plan response from the model
    outputs = model.generate(inputs['input_ids'], max_length=1000, num_return_sequences=1, no_repeat_ngram_size=2, temperature=0.7)
    # Decode and return the response as a string
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    if prompt in response:
        response = response.replace(prompt, "").strip()
    print(response)
    return response




@app.post("/generate_meal_plan/")
async def get_meal_plan(request: DiseaseRequest):
    """
    API endpoint to generate a meal plan for a given disease.
    """
    meal_plan = generate_meal_plan(request.disease)
    return {"meal_plan": meal_plan}

