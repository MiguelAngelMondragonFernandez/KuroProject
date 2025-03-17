from .serializers import ConversacionSerializer
from .models import Conversacion
from rest_framework import viewsets
from users.permissions import IsTokenValid

class ConversacionViewSet(viewsets.ModelViewSet):
    queryset = Conversacion.objects.all()
    serializer_class = ConversacionSerializer
    permission_classes = [IsTokenValid]