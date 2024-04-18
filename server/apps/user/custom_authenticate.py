from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class EmailBackend(ModelBackend):
    """
    Django by default only supports username/psswd combinations, so I extend ModelBackend to authenticate with email.
    """

    def authenticate(self, request, email=None, password=None):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
            if user.check_password(password):
                return user
        except UserModel.DoesNotExist:
            return None
        except Exception as e:
            pass
