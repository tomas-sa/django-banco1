from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
usuario = get_user_model()


class CuentaCorriente(models.Model):
    user = models.ForeignKey(
        usuario, on_delete=models.CASCADE, related_name='ahorros')
    moneda = models.CharField(max_length=3, choices=[(
        'ARS', 'ARS'), ('USD', 'USD'), ('EUR', 'EUR')])
    dinero = models.IntegerField()

    def __str__(self):
        return 'cuenta de ' + self.user.username + ' en ' + self.moneda
