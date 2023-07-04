from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Ahorros(models.Model):
    usuario = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='ahorros')
    moneda = models.CharField(max_length=5)
    dinero = models.IntegerField()
