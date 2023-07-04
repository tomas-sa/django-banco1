from rest_framework import serializers
from .models import CuentaCorriente
from django.contrib.auth import get_user_model

usuario = get_user_model()


class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuentaCorriente
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    ahorros = CuentaSerializer(read_only=True, many=True)

    class Meta:
        model = usuario
        fields = ['id', 'ahorros', 'username', 'email']
