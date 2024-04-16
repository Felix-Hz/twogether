import os
from django.shortcuts import render
from django.http import HttpResponse

current_user = os.environ.get("USER")
working_directory = os.getcwd().split("/")
current_working_directory = "/".join(working_directory[-2:])


def user(request):
    return HttpResponse(
        f"Hello, World! This is {current_user} from {current_working_directory}."
    )
