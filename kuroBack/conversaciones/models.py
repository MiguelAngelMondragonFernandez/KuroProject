from django.db import models

# Create your models here.
class Conversacion(models.Model):
    participantes = models.JSONField()

    def __str__(self):
        return self.usuario