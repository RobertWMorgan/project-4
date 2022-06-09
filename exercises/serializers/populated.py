from .common import ExerciseSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedExerciseSerializer(ExerciseSerializer):
    owner = UserSerializer()