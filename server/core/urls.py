"""
URL configuration for twogether_server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

import os
from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse

current_user = os.environ.get("USER")


def welcome(request):
    current_user = (
        request.user.username if request.user.is_authenticated else "Anonymous"
    )
    working_directory = os.getcwd().split("/")
    current_working_directory = "/".join(working_directory[-2:])
    server_host = request.META.get("HTTP_HOST", "Unknown host")
    return HttpResponse(
        f"Hello, World! This is {current_user} from {current_working_directory}. Running at: http://{server_host}"
    )


urlpatterns = [
    path("", welcome),
    path("user/", include("apps.user.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("admin/", admin.site.urls),
]
