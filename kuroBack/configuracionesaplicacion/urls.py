from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ConfiguracionesAplicacionViewSet

router = SimpleRouter()

router.register(r'api', ConfiguracionesAplicacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]