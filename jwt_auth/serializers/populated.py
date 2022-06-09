from .common import UserSerializer
from exercises.serializers.common import ExerciseSerializer

class PopulatedUserSerializer(UserSerializer):
    exercises = ExerciseSerializer(many=True)