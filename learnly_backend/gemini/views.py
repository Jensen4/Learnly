from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .service import GeminiService


class GenerateContentView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        prompt = request.data.get('prompt')
        
        if not prompt:
            return Response(
                {'error': 'Prompt is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            gemini_service = GeminiService()
            result = gemini_service.generate_content(prompt)
            
            if result['success']:
                return Response(result, status=status.HTTP_200_OK)
            else:
                return Response(result, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


def test_ai_view(request):
    """View to serve the AI test template."""
    return render(request, 'gemini/test_ai.html')


def pdf_summarizer_view(request):
    """View to serve the PDF summarizer template."""
    return render(request, 'gemini/pdf_summarizer.html')


class PDFSummarizeView(APIView):
    """APIView for uploading and summarizing PDF files."""
    permission_classes = [AllowAny]
    
    def post(self, request):
        """Upload PDF and return summary as JSON."""
        if 'pdf_file' not in request.FILES:
            return Response(
                {'error': 'No PDF file provided'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        pdf_file = request.FILES['pdf_file']
        
        # Validate file type
        if not pdf_file.name.lower().endswith('.pdf'):
            return Response(
                {'error': 'File must be a PDF'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            gemini_service = GeminiService()
            
            # Extract text from PDF
            pdf_text = gemini_service.extract_text_from_pdf(pdf_file)
            
            if not pdf_text.strip():
                return Response(
                    {'error': 'No text found in PDF'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Summarize the text
            result = gemini_service.summarize_pdf(pdf_text)
            
            if result['success']:
                return Response(result['data'], status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': result['error']}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
                
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )