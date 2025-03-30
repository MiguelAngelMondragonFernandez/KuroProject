from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import MensajeViewSet

router = SimpleRouter()

router.register(r'api', MensajeViewSet)
from .views import *

urlpatterns = [
    path('', include(router.urls))
]