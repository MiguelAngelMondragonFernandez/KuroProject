from django.db import models
from users.models import User
from conversaciones.models import Conversacion
# Create your models here.

class Mensaje(models.Model):
    mensaje = models.CharField(max_length=300)
    fecha = models.DateField()
    url_image = models.URLField()
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    conversacion = models.ForeignKey(Conversacion, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.usuario
