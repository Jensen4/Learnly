"""
URLs for Gemini integration.
"""

from django.urls import path
from . import views

urlpatterns = [
    path('generate/', views.GenerateContentView.as_view(), name='generate_content'),
    path('test/', views.test_ai_view, name='test_ai'),
]
