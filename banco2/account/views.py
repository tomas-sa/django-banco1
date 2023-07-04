from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework import viewsets
from .models import CuentaCorriente
from django.contrib.auth import get_user_model
from .serializers import CuentaSerializer, UserSerializer
usuario = get_user_model()


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class CuentaViewSet(viewsets.ModelViewSet):
    queryset = CuentaCorriente.objects.all()
    serializer_class = CuentaSerializer


# CODIGO QUE CHATGPT PROPORCIONÓ PARA OBTENER ID DE USUARIO LOGGEADO, ABERIGUAR SOBRE ESTO EN GOOGLE

    def list(self, request, *args, **kwargs):
        user_id = request.user.id
        print(f"User ID: {user_id}")
        return super().list(request, *args, **kwargs)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class UserViewSet(viewsets.ModelViewSet):
    queryset = usuario.objects.all()
    serializer_class = UserSerializer


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class TransferenciaViewSet(viewsets.ModelViewSet):
    queryset = CuentaCorriente.objects.none()
    serializer_class = CuentaSerializer

    def create(self, request, *args, **kwargs):
        usuario_origen_id = request.user.id
        usuario_destino_id = request.data.get('usuario_destino_id')
        cantidad = request.data.get('cantidad')

        cuenta_origen = CuentaCorriente.objects.filter(
            user_id=usuario_origen_id).first()
        cuenta_destino = CuentaCorriente.objects.filter(
            user_id=usuario_destino_id).first()

        if not cuenta_origen:
            return Response({'error': 'Cuenta de origen no encontrada'}, status=400)

        if not cuenta_destino:
            return Response({'error': 'Cuenta de destino no encontrada'}, status=400)

        if cuenta_origen.dinero < cantidad:
            return Response({'error': 'Saldo insuficiente'}, status=400)

        cuenta_origen.dinero -= cantidad
        cuenta_destino.dinero += cantidad

        cuenta_origen.save()
        cuenta_destino.save()

        return Response({'message': 'Transferencia exitosa'})
