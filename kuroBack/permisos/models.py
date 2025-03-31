from django.db import models

# Create your models here.
class Permiso(models.Model):
    id = models.BigIntegerField(primary_key=True)
    is_staffPermission = models.BooleanField(default=False)
    path = models.CharField(max_length=255)
    method = models.CharField(max_length=10)

