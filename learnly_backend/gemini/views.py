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