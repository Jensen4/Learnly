from django.contrib import admin
from .models import Notes, Quizzes


@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "created_at"]
    list_filter = ["author", "created_at"]
    search_fields = ["title"]
    readonly_fields = ["created_at", "updated_at"]


@admin.register(Quizzes)
class QuizzesAdmin(admin.ModelAdmin):
    list_display = ["title", "note", "author", "created_at"]
    list_filter = ["author", "created_at"]
    search_fields = ["title", "note__title"]
    readonly_fields = ["created_at", "updated_at"]
