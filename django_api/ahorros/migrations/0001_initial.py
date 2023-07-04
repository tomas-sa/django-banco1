# Generated by Django 4.2.2 on 2023-06-29 00:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ahorros',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('moneda', models.CharField(max_length=50)),
                ('dinero', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
    ]
