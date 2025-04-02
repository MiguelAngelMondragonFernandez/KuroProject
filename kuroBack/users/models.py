# Create your models here.
import uuid
from datetime import datetime, timedelta
# kuroBack/users/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=30, blank=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    url_photo = models.CharField(max_length=255, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email



class Token(models.Model):
    key_pass = models.UUIDField(default=uuid.uuid4, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created = models.DateTimeField(default=datetime.now())
    expired = models.DateTimeField(default=datetime.now() + timedelta(minutes=1))

    def is_expired(self):
        return self.expired < datetime.now() - timedelta(minutes=1)

    def __str__(self):
        return str(self.key_pass)


class TokenRecovery(models.Model):
    key_recovery = models.UUIDField(default=uuid.uuid4, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.key_recovery)