from rest_framework import viewsets
from .models import Mensaje
from .serializers import MensajeSerializer
from users.permissions import IsTokenValid

class MensajeViewSet(viewsets.ModelViewSet):
    queryset = Mensaje.objects.all()
    serializer_class = MensajeSerializer
    permission_classes = [IsTokenValid]