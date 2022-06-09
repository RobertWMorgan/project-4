from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Exercise
from .serializers.common import ExerciseSerializer

class ExerciseListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        exercises = Exercise.objects.all()
        serialized_exercises = ExerciseSerializer(exercises, many=True)
        return Response(serialized_exercises.data, status.HTTP_200_OK)

    def post(self,request):
        request.data['createdby'] = request.user.id
        exercise_to_add = ExerciseSerializer(data=request.data)
        print('USER ->', request.user)
        try:
            exercise_to_add.is_valid()
            print()
            exercise_to_add.save()
            return Response(exercise_to_add.data, status.HTTP_201_CREATED)
        except Exception as e:
          return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)