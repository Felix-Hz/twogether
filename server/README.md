<!-- ======================================== >
        instructions for personal use
<    ======================================== >

1. py manage.py runserver
2. python3 manage.py startapp user ./api/user
3. register nested apps
```
                            INSTALLED_APPS = [
                                ...
                                'api.user',
                                'api.post',
                                'api.comment',
                            ]
```
4. update the name in apps.py files in all three apps
```
                            class UserConfig(AppConfig):
                                default_auto_field = 'django.db.models.BigAutoField'
                                name = 'api.user'
```

@NOTE= when modules are not found is usually that the venv/ python interpreter is not selected properly. 

-->
