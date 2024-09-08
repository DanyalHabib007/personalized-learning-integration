import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag.Recommendation import AIVoiceAssistant

# Define FastAPI app
app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. You can restrict to specific domains if needed.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Pydantic model for input validation
class UserInput(BaseModel):
    quiz_score: int = None
    learning_style: str = None
    course_selected: str = None
    user_rating: int = None
    area_of_interest: str = None

# Initialize the assistant
assistant = AIVoiceAssistant()

@app.post("/recommend")
async def recommend_course(user_input: UserInput):
    try:
        # Call the interact_with_llm method
        recommendation = assistant.interact_with_llm(
            quiz_score=user_input.quiz_score,
            learning_style=user_input.learning_style,
            course_selected=user_input.course_selected,
            user_rating=user_input.user_rating,
            area_of_interest=user_input.area_of_interest
        )
        if recommendation is None:
            raise HTTPException(status_code=500, detail="Error during interaction with LLM")
        return {"recommendation": recommendation}
    except Exception as e:
        logging.error(f"Failed to process request: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred.")

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}
