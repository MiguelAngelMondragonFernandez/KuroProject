from django.db import models

# Create your models here.
class Conversacion(models.Model):
    participantes = models.CharField(max_length=100)

    def __str__(self):
        return self.usuario