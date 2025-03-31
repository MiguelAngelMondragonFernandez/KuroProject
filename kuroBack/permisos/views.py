from .serializers import PermisoSerializer
from .models import Permiso
from rest_framework import viewsets
from users.permissions import IsTokenValid


class PermisoViewSet(viewsets.ModelViewSet):
    queryset = Permiso.objects.all()
    serializer_class = PermisoSerializer
    permission_classes = [IsTokenValid]