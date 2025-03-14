from .serializers import ConversacionSerializer
from .models import Conversacion
from rest_framework import viewsets

class ConversacionViewSet(viewsets.ModelViewSet):
    queryset = Conversacion.objects.all()
    serializer_class = ConversacionSerializer