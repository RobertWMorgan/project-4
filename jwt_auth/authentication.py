from email import header
from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied

from django.conf import settings

import jwt

# User
from django.contrib.auth import get_user_model
User = get_user_model()

class JWTAuthentication(BasicAuthentication):
    def authenticate(self, request):
        header = request.headers.get('Authorization')
        print('header ->', header)

        # Check if header exists
        if not header:
            return None

        # Check if it's a bearer token
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail='Auth token is invalid')

        # Remove Bearer  from token
        token = header.replace('Bearer ', '')

        try:
            # Decode the token
            # ? -NEED TO REPLACE SETTINGS.SECRET_KEY WITH .ENV LATER
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

            user = User.objects.get(pk=payload.get('sub'))

        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid token')

        except User.DoesNotExist:
            raise PermissionDenied(detail='User not found')

        # Passes on the user and the token to the request
        return (user, token)