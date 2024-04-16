from django.apps import AppConfig

# update the name for the nested apps
class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api.user'
