from django.contrib import admin
from django.contrib.auth import get_user_model

# Registering the user model
User = get_user_model()
admin.site.register(User)