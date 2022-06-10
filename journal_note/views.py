from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import NoteSerializer
from .models import Note

class NoteDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        note_to_add = NoteSerializer(data=request.data)
        try:
            note_to_add.is_valid(True)
            note_to_add.save()
            return Response(note_to_add.data, status.HTTP_201_CREATED)
        except Exception as e:
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

