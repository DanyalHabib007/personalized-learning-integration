import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import chainlit as cl

# Load environment variables
load_dotenv()

# Define the Hugging Face Inference Client for Mistral
client = InferenceClient(
    "mistralai/Mistral-Nemo-Instruct-2407",
    token=os.getenv("HUGGINGFACE_API_TOKEN"),
)

# Define the system instruction
system_instruction = "You are an AI teaching assistant. Help students by providing clear, concise explanations and solving their doubts."

# Function to get a response from Mistral model


def ask_order(question, system_instruction):
    messages = [
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": question}
    ]
    response = ""
    for message in client.chat_completion(
        messages=messages,
        max_tokens=500,
        stream=True,
    ):
        response += message.choices[0].delta.content
    return response

# Handle incoming messages in Chainlit


@cl.on_message
async def main(user_message: cl.Message):
    response = ask_order(user_message.content, system_instruction)

    # Send a response back to the user
    await cl.Message(
        content=f"Received: {response}",
    ).send()

# Run the Chainlit app
if __name__ == "__main__":
    cl.run()
