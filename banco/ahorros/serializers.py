from rest_framework import serializers
from .models import Ahorros
from django.contrib.auth.models import User


class AhorrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ahorros
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    ahorros = AhorrosSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'ahorros']
