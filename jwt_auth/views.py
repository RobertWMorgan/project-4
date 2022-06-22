from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
from datetime import datetime, timedelta
from django.conf import settings
import jwt
import environ
env = environ.Env()
environ.Env.read_env()

from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Serializer
from .serializers.common import UserSerializer, UserViewSerializer
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
            return Response({ 'detail': user_to_register.errors }, status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def post(self, request):
        print('hit the login route, ', request.data)
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_register = User.objects.get(email=email)
            print(user_to_register)
        # User doesn't exist
        except User.DoesNotExist:
            print(user_to_register, 'incorrect pw')
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
            env('SECRET_KEY'),
            algorithm='HS256'
        )

        return Response({ 'message': f"Welcome back, {user_to_register.username}", 'token': token, 'username': user_to_register.username }, status.HTTP_202_ACCEPTED)









class UserView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request, username):
      try:
          user_to_get = User.objects.get(username=username)
          serialized_user = PopulatedUserSerializer(user_to_get)
          return Response(serialized_user.data, status.HTTP_200_OK)
      except Exception as e:
          return Response(serialized_user.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)


    def put(self, request, username):
        try:
            user_to_edit = User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound('User Not Found')

        if user_to_edit.id != request.user.id:
            raise PermissionDenied()

        try:
          deserialized_user = UserViewSerializer(user_to_edit, request.data)
          deserialized_user.is_valid()
          print(deserialized_user.errors)
          deserialized_user.save()
          return Response(deserialized_user.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)
