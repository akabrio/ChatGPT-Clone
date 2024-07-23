import os
from openai import AzureOpenAI
from dotenv import load_dotenv
load_dotenv(".env")


def search(prompt):
    client = AzureOpenAI(
    azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"), 
    api_key=os.getenv("AZURE_OPENAI_KEY"),  
    api_version="2024-02-15-preview"
    )

    text_prompt = prompt
    
    response = client.chat.completions.create(
    model = os.getenv("CHAT_COMPLETION_NAME"),

    messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant",
            },
            
            {
                "role": "user",
                "content": text_prompt
            }
        ],
    temperature= 0.7,
    top_p= 0.95,
    max_tokens= 800)

    return response.choices[0].message.content 