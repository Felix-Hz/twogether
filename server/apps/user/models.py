from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    is_verified = models.BooleanField(default=False)
    full_name = models.CharField(max_length=50)
    bio = models.TextField(blank=True)
    subscription_status = models.CharField(
        max_length=20,
        choices=[("free", "Free"), ("basic", "Basic"), ("premium", "Premium")],
        default="free",
    )
