from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=20, unique=True)
    # All optionals
    weight = models.CharField(max_length=10, blank=True, null=True)
    goal_weight = models.CharField(max_length=10, blank=True, null=True)
    height = models.CharField(max_length=10, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    profile_image = models.CharField(max_length=100, blank=True, null=True)