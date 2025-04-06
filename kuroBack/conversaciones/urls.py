from .views import *
from rest_framework.routers import SimpleRouter
from django.urls import path, include

router = SimpleRouter()

router.register(r'api', ConversacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get/<int:id_user>/', getConversacionesByIdUser.as_view(), name='conversaciones_by_user_id'),
    path('create/', CreateGroup.as_view(), name='create_group'),
]