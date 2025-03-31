from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import *

router = SimpleRouter()

router.register(r'api', MensajeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get/<int:id_conversacion>/', mensajesByIdConversacion.as_view(), name='mensajes_by_id_conversacio'),
    path('post/<int:id_conversacion>/', mensajePost.as_view(), name='mensajes_by_id_conversacio'), # Cambiado a 'post' para crear un nuevo mensaje
]