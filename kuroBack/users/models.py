from django.db import models

# Create your models here.

class User(models.Model):
    apM = models.CharField(max_length=50)
    apP = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=50)
    url_photo = models.CharField(max_length=250)

    def __str__(self):
        return self.email