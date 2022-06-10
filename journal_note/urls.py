from django.urls import path
from .views import NoteDetailView

urlpatterns = [
    path('', NoteDetailView.as_view())
]