# https://www.cdrf.co/

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class WelcomeAPIView(APIView):
    """
    Status check
    """

    def get(self, request):
        return Response("This is the user endpoint", status=status.HTTP_200_OK)


class SignUpAPIView(APIView):
    """
    Register user
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignInAPIView(APIView):
    """
    Log-in user
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return Response(
                    {"message": "Login successful"}, status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogOutAPIView(APIView):
    """
    Log-out user
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


class DeleteAccountAPIView(APIView):
    """
    G'bye!
    """

    permission_classes = [IsAuthenticated]

    def delete(self, request):
        request.user.delete()
        return Response(
            {"message": "Account deleted"}, status=status.HTTP_204_NO_CONTENT
        )


class ModifyAccountAPIView(APIView):
    """
    Modify user details
    """

    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
