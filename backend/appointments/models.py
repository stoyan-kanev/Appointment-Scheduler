from django.db import models

from users.models import User


# Create your models here.

class Appointment(models.Model):
    person = models.CharField(max_length=254,default="")
    phone = models.CharField(max_length=254,default="")
    date_time = models.DateTimeField()
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.person} - {self.date_time.strftime('%d.%m.%Y %H:%M')}"
