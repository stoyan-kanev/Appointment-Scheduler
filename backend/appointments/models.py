from django.db import models

class Appointment(models.Model):
    first_name = models.CharField(max_length=100, default="Unknown")
    last_name = models.CharField(max_length=100, default="Person")
    email = models.EmailField(default="unknown@example.com")
    phone = models.CharField(max_length=20, default="0000000000")
    date_time = models.DateTimeField()
    is_done = models.BooleanField(default=False)
    barber_name = models.CharField(max_length=100,default="unknown")

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.date_time.strftime('%d.%m.%Y %H:%M')}"
