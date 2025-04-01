from rest_framework import viewsets
from .models import ConfiguracionAplicacion
from .serializers import ConfiguracionAplicacionSerializer
from users.permissions import IsTokenValid

class ConfiguracionesAplicacionViewSet(viewsets.ModelViewSet):
    queryset = ConfiguracionAplicacion.objects.all()
    serializer_class = ConfiguracionAplicacionSerializer
    permission_classes = [IsTokenValid]