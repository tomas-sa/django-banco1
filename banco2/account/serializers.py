from rest_framework import serializers
from .models import CuentaCorriente, Transferencia
from django.contrib.auth import get_user_model

usuario = get_user_model()


class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuentaCorriente
        fields = '__all__'


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transferencia
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    ahorros = CuentaSerializer(read_only=True, many=True)
    transferencias = RegistroSerializer(
        source='ahorros.registrotransferencia_set', many=True, read_only=True)

    class Meta:
        model = usuario
        fields = ['id', 'ahorros', 'username',
                  'email', 'transferencias', 'password']

    def create(self, validated_data):
        user = usuario.objects.create_user(**validated_data)
        return user
