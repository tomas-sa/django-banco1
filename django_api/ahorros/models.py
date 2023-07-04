from django.db import models
# from user.models import User
from django.contrib.auth import get_user_model

# Create your models here.
CustomUser = get_user_model()


class Ahorros(models.Model):
    usuario = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name='ahorros')
    moneda = models.CharField(max_length=50)
    dinero = models.DecimalField(max_digits=10, decimal_places=2)
