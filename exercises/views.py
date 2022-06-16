from django.forms import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.exceptions import NotFound, PermissionDenied
 
from .models import Exercise
from .serializers.common import ExerciseSerializer
from .serializers.populated import PopulatedExerciseSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated


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
            return Response({ 'detail': exercise_to_add.errors }, status.HTTP_422_UNPROCESSABLE_ENTITY)

class ExerciseDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, pk):
        try:
            exercise_to_delete = Exercise.objects.get(pk=pk)
        except Exercise.DoesNotExist:
            raise NotFound('Exercise Not Found')
        
        if exercise_to_delete.owner != request.user:
          raise PermissionDenied()
        
        exercise_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            exercise_to_edit = Exercise.objects.get(pk=pk)
        except Exercise.DoesNotExist:
            raise NotFound('Exercise Not Found')
        
        if exercise_to_edit.owner != request.user:
            raise PermissionDenied()
        request.data['owner'] = request.user.id
        deserialized_exercise = ExerciseSerializer(exercise_to_edit, request.data)
        try:
            deserialized_exercise.is_valid()
            print('ERRORS =>', deserialized_exercise.errors)
            deserialized_exercise.save()
            return Response(deserialized_exercise.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({ 'detail': deserialized_exercise.errors }, status.HTTP_422_UNPROCESSABLE_ENTITY)