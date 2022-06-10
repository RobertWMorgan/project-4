from .common import UserSerializer
from exercises.serializers.common import ExerciseSerializer
from journal_note.serializers.common import NoteSerializer

class PopulatedUserSerializer(UserSerializer):
    exercises = ExerciseSerializer(many=True)
    notes = NoteSerializer(many=True)