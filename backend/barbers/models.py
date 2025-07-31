from django.db import models

from users.models import User


# Create your models here.
class Barbers(models.Model):
    name = models.CharField(max_length=100)
    users = models.ManyToManyField(User)
    is_barber = models.BooleanField(default=False)