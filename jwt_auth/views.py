from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta
from django.conf import settings
import jwt

# Serializer
from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer

# User Model
from django.contrib.auth import get_user_model
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        user_to_register = UserSerializer(data=request.data)
        try:
            user_to_register.is_valid()
            print('validation errors =>', user_to_register.errors)
            user_to_register.save()
            return Response({ 'message': 'Registration Successful'}, status.HTTP_202_ACCEPTED)

        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_register = User.objects.get(email=email)

        # User doesn't exist
        except User.DoesNotExist:
            raise PermissionDenied('Invalid login details')

        # Wrong Password
        if not user_to_register.check_password(password):
            raise PermissionDenied('Invalid login details')

        # Building the token
        dt = datetime.now() + timedelta(hours=3)
        token = jwt.encode(
            {
                'sub': user_to_register.id,
                'exp': int(dt.strftime('%s'))
            },
            # ? REPLACE WITH .ENV
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        
        return Response({ 'message': f"Welcome back, {user_to_register.username}", 'token': token }, status.HTTP_202_ACCEPTED)

class UserView(APIView):
    def get(self, _request, pk):
      try:
          user_to_get = User.objects.get(pk=pk)
          serialized_user = PopulatedUserSerializer(user_to_get)
          return Response(serialized_user.data, status.HTTP_200_OK)
      except Exception as e:
          return Response(str(e), status.HTTP_422_UNPROCESSABLE_ENTITY)