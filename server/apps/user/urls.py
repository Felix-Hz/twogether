from django.urls import path

from .views import (
    SignUpAPIView,
    SignInAPIView,
    LogOutAPIView,
    WelcomeAPIView,
    CheckEmailAPIView,
    DeleteAccountAPIView,
    ModifyAccountAPIView,
)

urlpatterns = [
    path("", WelcomeAPIView.as_view(), name="user"),
    path("signup/", SignUpAPIView.as_view(), name="signup"),
    path("signin/", SignInAPIView.as_view(), name="signin"),
    path("logout/", LogOutAPIView.as_view(), name="logout"),
    path("delete/", DeleteAccountAPIView.as_view(), name="delete"),
    path("modify/", ModifyAccountAPIView.as_view(), name="modify"),
    path("check/", CheckEmailAPIView.as_view(), name="check-email"),
]
