import os
import google.generativeai as genai
from typing import Dict, Any
import PyPDF2
import io


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
    
    def extract_text_from_pdf(self, pdf_file) -> str:
        """Extract text from uploaded PDF file."""
        try:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text.strip()
        except Exception as e:
            raise Exception(f"Error extracting text from PDF: {str(e)}")
    
    def summarize_pdf(self, pdf_text: str) -> Dict[str, Any]:
        """Summarize PDF content using Gemini AI."""
        try:
            prompt = f"""
            Please provide a comprehensive summary of the following document text. 
            Structure your response as a JSON object with the following format:
            
            {{
                "title": "Document Title (if identifiable)",
                "summary": "Main summary of the document",
                "key_points": ["Point 1", "Point 2", "Point 3"],
                "main_topics": ["Topic 1", "Topic 2", "Topic 3"],
                "conclusion": "Main conclusions or takeaways"
            }}
            
            Document text:
            {pdf_text[:4000]}  // Limit to first 4000 characters for API limits
            """
            
            response = self.model.generate_content(prompt)
            
            # Try to parse as JSON, fallback to plain text if parsing fails
            try:
                import json
                summary_data = json.loads(response.text)
                return {
                    "success": True,
                    "data": summary_data
                }
            except json.JSONDecodeError:
                return {
                    "success": True,
                    "data": {
                        "title": "PDF Document",
                        "summary": response.text,
                        "key_points": [],
                        "main_topics": [],
                        "conclusion": ""
                    }
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }