#!/usr/bin/env python3
"""
Simple test script for GeminiService.
Run this to test the service directly.
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the current directory to Python path so we can import the service
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from gemini.service import GeminiService

def test_gemini_service():
    """Test the Gemini service directly."""
    try:
        # Initialize the service
        service = GeminiService()
        
        # Test with a simple prompt
        prompt = "Explain what machine learning is in one sentence."
        print(f"Testing with prompt: {prompt}")
        
        result = service.generate_content(prompt)
        
        if result['success']:
            print("✅ Success!")
            print(f"Response: {result['content']}")
        else:
            print("❌ Error!")
            print(f"Error: {result['error']}")
            
    except Exception as e:
        print(f"❌ Failed to initialize service: {e}")
        print("Make sure you have:")
        print("1. Set GEMINI_API_KEY in your .env file")
        print("2. Installed requirements: pip install -r requirements.txt")

if __name__ == "__main__":
    test_gemini_service()
