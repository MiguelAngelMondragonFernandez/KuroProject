from django.db import models
from users.models import User

# Create your models here.
class ConfiguracionAplicacion(models.Model):
    colorPricipal = models.CharField(max_length=50)
    tema = models.CharField(max_length=50, default="light")
    idioma = models.CharField(max_length=50, default="es")
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.usuario