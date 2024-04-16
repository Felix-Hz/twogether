"""
- Translate model instances into Python datatypes
- Serve for data validation purposes
- Serializers also help when needing to nest relationships of the models

# https://blog.logrocket.com/django-rest-framework-create-api/#:~:text=API%2C%20and%20more.-,Setting%20up%20Django%20REST%20framework,activate%20to%20turn%20it%20on.
# https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model
    """

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")
        read_only_fields = ("id",)
        extra_kwargs = {
            "email": {"validators": [UniqueValidator(queryset=User.objects.all())]},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration
    """

    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "password2",
            "email",
            "first_name",
            "last_name",
        )
        extra_kwargs = {
            "password": {
                "write_only": True,
                "required": True,
                "validators": [validate_password],
            },
            "email": {"required": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate(self, attributes):
        """
        Validate password fields
        """
        if attributes["password"] != attributes["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attributes

    def create(self, validated_data):
        """
        Register user
        """
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login
    """

    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
