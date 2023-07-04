from rest_framework import serializers
from .models import Ahorros
from user.models import User
from django.contrib.auth import get_user_model

User = get_user_model()


class AhorrosSerializer(serializers.Serializer):

    class Meta:
        model = Ahorros
        fields = '__all__'

    """ def create(self, validated_data):
        print('CREADO CON EXITO')
        request = self.context.get('request')
        usuario = request.user
        caja_ahorros = Ahorros.objects.create(usuario=usuario, **validated_data)
        
        return caja_ahorros """


class UserSerializer(serializers.ModelSerializer):
    ahorros = AhorrosSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'ahorros']

    """ def create(self, validated_data):
        print('CREADO CON EXITO')
        cajas_ahorros_data = validated_data.pop('ahorros', [])  # Obtener los datos de las cajas de ahorros si existen
        user = User.objects.create(**validated_data)  # Crear el objeto de usuario

        for caja_data in cajas_ahorros_data:
            Ahorros.objects.create(usuario=user, **caja_data)  # Crear las cajas de ahorros relacionadas al usuario

        return user """
