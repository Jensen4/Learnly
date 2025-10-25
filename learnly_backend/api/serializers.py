from rest_framework import serializers
from .models import Notes, Quizzes


class NotesSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Notes
        fields = ['id', 'title', 'author', 'created_at', 'updated_at']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']


class QuizzesSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    note_title = serializers.CharField(source='note.title', read_only=True)
    
    class Meta:
        model = Quizzes
        fields = ['id', 'title', 'note', 'note_title', 'author', 'created_at', 'updated_at']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']
