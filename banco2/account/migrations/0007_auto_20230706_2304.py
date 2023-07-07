# Generated by Django 3.2.5 on 2023-07-07 02:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_auto_20230706_2247'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transferencia',
            name='cuenta_destino',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transferencias_recibidas', to='account.cuentacorriente'),
        ),
        migrations.AlterField(
            model_name='transferencia',
            name='cuenta_origen',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transferencias_enviadas', to='account.cuentacorriente'),
        ),
    ]
