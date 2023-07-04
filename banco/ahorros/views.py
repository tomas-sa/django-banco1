from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Ahorros
from django.contrib.auth.models import User
from .serializers import AhorrosSerializer, UserSerializer

# Create your views here.


class AhorrosViewSet(viewsets.ModelViewSet):
    queryset = Ahorros.objects.all()
    serializer_class = AhorrosSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
