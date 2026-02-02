from django.db import models

from users.models import User


# Create your models here.
class BarbersModel(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default='barber')
    image = models.CharField(max_length=100, default='no-image')
    description = models.TextField(default='')
    users = models.ManyToManyField(User)
    is_barber = models.BooleanField(default=False)