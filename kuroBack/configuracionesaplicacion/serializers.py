from rest_framework import serializers
from .models import ConfiguracionAplicacion


class ConfiguracionAplicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracionAplicacion
        fields = '__all__'