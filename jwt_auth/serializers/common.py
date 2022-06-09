from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
# User Model
from django.contrib.auth import get_user_model, password_validation
User = get_user_model()



class UserSerializer(serializers.ModelSerializer):
    # Password confirmation
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError({
                'password_confirmation': 'Does not match password'
            })

        data['password'] = make_password(password)
        return data

    # Serializing user data
    class Meta:
        model = User
        fields = ('id', 'date_joined', 'email', 'username', 'weight', 'goal_weight', 'height', 'age', 'profile_image', 'password', 'password_confirmation')