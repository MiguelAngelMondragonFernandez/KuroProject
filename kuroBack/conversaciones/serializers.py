from rest_framework import serializers
from .models import Conversacion

class ConversacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversacion
        fields = '__all__'