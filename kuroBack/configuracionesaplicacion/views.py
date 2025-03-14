from rest_framework import viewsets
from .models import ConfiguracionAplicacion
from .serializers import ConfiguracionAplicacionSerializer

class ConfiguracionesAplicacionViewSet(viewsets.ModelViewSet):
    queryset = ConfiguracionAplicacion.objects.all()
    serializer_class = ConfiguracionAplicacionSerializer