from django.db import models
from users.models import User
# Create your models here.

class Mensaje(models.Model):
    mensaje = models.CharField(max_length=300)
    fecha = models.DateField()
    url_imagee = models.URLField()
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.usuario
