from .common import UserSerializer
from exercises.serializers.common import ExerciseSerializer
from journal_note.serializers.populated import PopulatedNoteSerializer

class PopulatedUserSerializer(UserSerializer):
    exercises = ExerciseSerializer(many=True)
    notes = PopulatedNoteSerializer(many=True)