from django.urls import path
from .views import NoteDetailView, NoteSingleView

urlpatterns = [
    path('', NoteDetailView.as_view()),
    path('<int:pk>/', NoteSingleView.as_view())
]