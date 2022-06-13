from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import NoteSerializer
from .serializers.populated import PopulatedNoteSerializer
from .models import Note

class NoteDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        note_to_add = NoteSerializer(data=request.data)
        try:
            note_to_add.is_valid(True)
            print(note_to_add.errors)
            note_to_add.save()
            return Response(note_to_add.data, status.HTTP_201_CREATED)
        except Exception as e:
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

# class NoteMonthView(APIView):
#     permission_classes = (IsAuthenticated, )

#     def get(self, request, month):
#         try:
#             user_notes = Note.objects.filter(owner=request.user.id)
#             print('returned notes =>', user_notes)
#             serialized_notes = NoteSerializer(user_notes)
#             print('serialized notes =>', serialized_notes.data)
#             return Response(serialized_notes.data, status.HTTP_200_OK)
#         except Exception as e:
#             return Response({ 'detail': str(e) }, status.HTTP_400_BAD_REQUEST)

class NoteSingleView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk):
      try:
          note = Note.objects.get(pk=pk)

          if request.user.id != note.owner.id:
              print(request.user.id,note.owner.id)
              raise PermissionDenied()

          serialized_note = NoteSerializer(note)
          return Response(serialized_note.data, status.HTTP_200_OK)

      except Exception as e:
          return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)
    

    def put(self, request, pk):
        try:
            note_to_update = Note.objects.get(pk=pk)
            if request.user.id != note_to_update.owner.id:
              raise PermissionDenied()

            request.data["owner"] = request.user.id
            serialized_note = NoteSerializer(note_to_update, request.data)
            serialized_note.is_valid(True)
            serialized_note.save()
            print(serialized_note.errors)

            return Response(serialized_note.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        print('delete route')
        review_to_delete = Note.objects.get(pk=pk)
        print(request.user.id, review_to_delete.owner.id)
        if review_to_delete.owner.id != request.user.id:
            raise PermissionDenied()

        review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)