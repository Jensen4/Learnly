"""
URLs for Gemini integration.
"""

from django.urls import path
from . import views

urlpatterns = [
    path('generate/', views.GenerateContentView.as_view(), name='generate_content'),
    path('test/', views.test_ai_view, name='test_ai'),
    path('pdf-summarize/', views.PDFSummarizeView.as_view(), name='pdf_summarize'),
    path('pdf/', views.pdf_summarizer_view, name='pdf_summarizer'),
]
