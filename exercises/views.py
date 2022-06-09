from django.forms import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.exceptions import NotFound 

from .models import Exercise
from .serializers.common import ExerciseSerializer
from .serializers.populated import PopulatedExerciseSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly


class ExerciseListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def post(self, request):
        request.data['owner'] = request.user.id
        exercise_to_add = ExerciseSerializer(data=request.data)
        try:
            exercise_to_add.is_valid(True)
            exercise_to_add.save()
            return Response(exercise_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            return Response(exercise_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)
