from django.urls import path

from exercises.views import ExerciseDetailView, ExerciseListView


urlpatterns = [
  path('', ExerciseListView.as_view()),
  path('<int:pk>/', ExerciseDetailView.as_view())
]