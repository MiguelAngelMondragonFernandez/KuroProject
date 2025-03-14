from django.urls import path
from .views import *

urlpatterns = [
    path("api/find/", findAll, name="ver"),
    path("api/find/<int:id>/", findOne, name="ver"),
    path("api/create/", create, name="agregar"),
    path("api/update/", update, name="lista"),
    path('api/kill/',kill,name='post'),
]
