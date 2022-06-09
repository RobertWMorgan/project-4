from django.urls import path

from exercises.views import ExerciseListView


urlpatterns = [
  path('', ExerciseListView.as_view())

]