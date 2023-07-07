
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework import viewsets
from .models import CuentaCorriente, Transferencia
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import status
from itertools import chain
from .serializers import CuentaSerializer, UserSerializer, RegistroSerializer
usuario = get_user_model()


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class CuentaViewSet(viewsets.ModelViewSet):
    queryset = CuentaCorriente.objects.all()
    serializer_class = CuentaSerializer

    def get_queryset(self):
        # Filtrar las cuentas bancarias del usuario logueado

        user = self.request.user
        return user.ahorros.all()


# CODIGO QUE CHATGPT PROPORCIONÓ PARA OBTENER ID DE USUARIO LOGGEADO, ABERIGUAR SOBRE ESTO EN GOOGLE

    """ def list(self, request, *args, **kwargs):
        user_id = request.user.id
        print(f"User ID: {user_id}")
        return super().list(request, *args, **kwargs) """


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class UserViewSet(viewsets.ModelViewSet):
    queryset = usuario.objects.all()
    serializer_class = UserSerializer


class TransferenciaAPIView(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        usuario_origen_id = request.user.id
        usuario_destino_id = request.data.get('usuario_destino_id')
        cantidad = request.data.get('cantidad')
        moneda = request.data.get('moneda')

        cuenta_origen = CuentaCorriente.objects.filter(
            user=usuario_origen_id, moneda=moneda).first()
        cuenta_destino = CuentaCorriente.objects.filter(
            user=usuario_destino_id, moneda=moneda).first()
        print(cuenta_destino)

        if not cuenta_origen:
            return Response({'error': 'Cuenta de origen no encontrada'}, status=400)

        if not moneda:
            return Response({'error': 'debes seleccionar una moneda'}, status=400)

        if not cuenta_destino:
            return Response({'error': 'Cuenta de destino no encontrada'}, status=400)

        if cuenta_origen.dinero < cantidad:
            return Response({'error': 'Saldo insuficiente'}, status=400)

        if cuenta_origen == cuenta_destino:
            return Response({'error': 'No es posible realizar esta transferencia'}, status=400)

        cuenta_origen.dinero -= cantidad
        cuenta_destino.dinero += cantidad

        cuenta_origen.save()
        cuenta_destino.save()

        transferencia = Transferencia.objects.create(
            cuenta_origen=cuenta_origen,
            cuenta_destino=cuenta_destino,
            cantidad=cantidad,
            moneda=moneda
        )

        serializer = RegistroSerializer(transferencia)
        return Response(serializer.data, status=201)

    def get(self, request, *args, **kwargs):
        usuario = request.user.id

        transferencias_origen = Transferencia.objects.filter(
            cuenta_origen__user_id=usuario)
        transferencias_destino = Transferencia.objects.filter(
            cuenta_destino__user_id=usuario)

        transferencias = list(
            chain(transferencias_origen, transferencias_destino))

        serializer = RegistroSerializer(transferencias, many=True)
        return Response(serializer.data, status=200)


class UserCreateAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
