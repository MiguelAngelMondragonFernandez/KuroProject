from django.contrib.auth.views import LogoutView
from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import *

router = SimpleRouter()
router.register(r'api', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('recovery/', SendMail.as_view(), name='recovery'),
    path('reset/<str:token>/', Reset.as_view(), name='reset'),
    path('getByEmail/<str:email>/', GetUserByEmail.as_view(), name='get_user_by_email'),
]