from rest_framework import serializers
from .models import User, Token, TokenRecovery

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        extra_fields = ['password', 'url_photo', 'is_active', 'is_staff']
        fields = ['id','email', 'name', 'first_name', 'last_name'] + extra_fields

    def create(self, validated_data):
        user = super().create(validated_data)
        Token.objects.create(user=user)
        return user