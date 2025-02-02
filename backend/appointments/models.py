from django.db import models

# Create your models here.

class Appointment(models.Model):
    title = models.CharField(max_length=100)
    date_time = models.DateTimeField()

    def __str__(self):
        return f"{self.title} - {self.date_time.strftime('%d.%m.%Y %H:%M')}"