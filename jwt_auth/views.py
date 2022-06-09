from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from datetime import datetime, timedelta
from django.conf import settings
import jwt

# Serializer
from .serializers.common import UserSerializer

# User Model
from django.contrib.auth import get_user_model
User = get_user_model()
