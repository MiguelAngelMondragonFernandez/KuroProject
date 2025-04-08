from rest_framework import serializers
from .models import User, Token, TokenRecovery

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'first_name', 'last_name']

    def create(self, validated_data):
        user = super().create(validated_data)
        Token.objects.create(user=user)
        return user