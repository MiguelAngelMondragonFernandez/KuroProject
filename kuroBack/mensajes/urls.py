from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import *

router = SimpleRouter()

router.register(r'api', MensajeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get/<int:id_conversacion>/', mensajesByIdConversacion.as_view(), name='mensajes_by_id_conversacio'),
]