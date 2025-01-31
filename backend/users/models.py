from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


# Create your models here.

class User(AbstractUser):
    email = models.EmailField(
        unique=True,
        max_length=255,
    )
    first_name = models.CharField(
        unique=False,
        blank=False,
        max_length=20,
    )
    last_name = models.CharField(
        unique=False,
        blank=False,
        max_length=20,
    )
    age = models.PositiveIntegerField(
        blank=False,
        null=False,
        default=0,
        validators=[MinValueValidator(1), MaxValueValidator(100)],
    )
