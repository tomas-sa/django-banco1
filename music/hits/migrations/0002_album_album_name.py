# Generated by Django 4.2.2 on 2023-07-02 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hits', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='album_name',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
    ]