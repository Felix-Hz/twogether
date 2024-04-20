"""
- Translate model instances into Python datatypes
- Serve for data validation purposes
- Serializers also help when needing to nest relationships of the models

# https://blog.logrocket.com/django-rest-framework-create-api/#:~:text=API%2C%20and%20more.-,Setting%20up%20Django%20REST%20framework,activate%20to%20turn%20it%20on.
# https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5
"""

import uuid
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

CustomUser = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for CustomUser model
    """

    class Meta:
        model = CustomUser
        fields = ("id", "email", "full_name")
        read_only_fields = ("id",)
        extra_kwargs = {
            "email": {
                "validators": [UniqueValidator(queryset=CustomUser.objects.all())]
            },
            "full_name": {"required": True},
        }


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration
    """

    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = (
            "email",
            "full_name",
            "password",
            "password2",
        )
        extra_kwargs = {
            "password": {
                "write_only": True,
                "required": True,
                "validators": [validate_password],
            },
            "email": {"required": True},
            "full_name": {"required": True},
        }

    def validate(self, attributes):
        """
        Validate password fields
        """
        if attributes["password"] != attributes["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields don't match."}
            )

        return attributes

    def create(self, validated_data):
        """
        Register user
        """

        # @NOTE: Users receive a UUID by default as username to avoid working around Django's user.
        user = CustomUser.objects.create_user(
            username=uuid.uuid4(),
            email=validated_data["email"],
            password=validated_data["password"],
            full_name=validated_data["full_name"],
        )
        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login
    """

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
