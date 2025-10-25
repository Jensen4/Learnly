from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets, permissions
from .models import Notes, Quizzes
from .serializers import NotesSerializer, QuizzesSerializer


class NotesViewSet(viewsets.ModelViewSet):
    serializer_class = NotesSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notes.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class QuizzesViewSet(viewsets.ModelViewSet):
    serializer_class = QuizzesSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Quizzes.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
