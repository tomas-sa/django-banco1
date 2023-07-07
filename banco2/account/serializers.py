from rest_framework import serializers
from .models import CuentaCorriente, Transferencia
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

usuario = get_user_model()


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transferencia
        fields = '__all__'


class CuentaSerializer(serializers.ModelSerializer):
    transferencias_enviadas = RegistroSerializer(many=True, read_only=True)
    transferencias_recibidas = RegistroSerializer(many=True, read_only=True)

    class Meta:
        model = CuentaCorriente
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    ahorros = CuentaSerializer(read_only=True, many=True)

    class Meta:
        model = usuario
        fields = ['id', 'ahorros', 'username',
                  'email']

    def create(self, validated_data):
        user = usuario.objects.create_user(**validated_data)
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
