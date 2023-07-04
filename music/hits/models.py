from django.db import models

# Create your models here.


class Album(models.Model):
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=100)
    album_name = models.CharField(max_length=100)

    def __str__(self):
        return self.album_name


class Track(models.Model):
    album = models.ForeignKey(
        Album, related_name='tracks', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
