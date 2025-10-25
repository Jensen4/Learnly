import os
import google.generativeai as genai
from typing import Dict, Any


class GeminiService:
    
    def __init__(self):
        self.api_key = os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-2.5-pro')
    
    def generate_content(self, prompt: str) -> Dict[str, Any]:
        try:
            response = self.model.generate_content(prompt)
            return {
                "success": True,
                "content": response.text
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }