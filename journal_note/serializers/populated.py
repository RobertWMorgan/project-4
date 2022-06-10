from exercises.models import Exercise
from .common import NoteSerializer
from exercises.serializers.common import ExerciseSerializer

class PopulatedNoteSerializer(NoteSerializer):
    exercise= ExerciseSerializer()
