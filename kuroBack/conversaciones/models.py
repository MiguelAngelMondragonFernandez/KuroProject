from django.db import models

# Create your models here.
class Conversacion(models.Model):
    participantes = models.CharField(max_length=100)
    alias_grupo = models.CharField(max_length=30, null=True, blank=True)

    def __str__(self):
        return self.usuario