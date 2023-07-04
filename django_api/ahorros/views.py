from django.shortcuts import render
from .serializers import AhorrosSerializer,UserSerializer
from .models import Ahorros
from rest_framework import viewsets
from user.models import User
# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

User = get_user_model()

class AhorrosViewSet(viewsets.ModelViewSet):
    queryset = Ahorros.objects.all()
    serializer_class = AhorrosSerializer

    """ def create(self, request, *args, **kwargs):
        usuario_id = request.data.get('usuario') # Obtenemos el ID del usuario del cuerpo de la solicitud
        try:
            usuario = User.objects.get(pk=usuario_id)  # Buscamos el usuario por su ID
        except User.DoesNotExist:
            raise ValidationError('El usuario con el ID proporcionado no existe.')
        request.data['usuario'] = usuario.id  # Asignamos el ID del usuario en lugar del objeto completo
        return super().create(request, *args, **kwargs)
 """
class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer