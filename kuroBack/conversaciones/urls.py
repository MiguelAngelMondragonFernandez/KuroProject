from .views import ConversacionViewSet
from rest_framework.routers import SimpleRouter
from django.urls import path, include

router = SimpleRouter()

router.register(r'api', ConversacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]