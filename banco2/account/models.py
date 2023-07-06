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


class Transferencia(models.Model):
    cuenta_origen = models.ForeignKey(
        CuentaCorriente, related_name='transferencias_enviadas', on_delete=models.CASCADE
    )
    cuenta_destino = models.ForeignKey(
        CuentaCorriente, related_name='transferencias_recibidas', on_delete=models.CASCADE
    )
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Transferencia de {self.cuenta_origen.user.username} a {self.cuenta_destino.user.username}'