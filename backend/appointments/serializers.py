from rest_framework import serializers
from datetime import datetime
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    date_time = serializers.DateTimeField(
        format="%d.%m.%Y %H:%M",  # ✅ Django will send the date in this format
        input_formats=["%d.%m.%Y %H:%M", "%Y-%m-%d %H:%M"]  # ✅ Accepts multiple formats
    )

    class Meta:
        model = Appointment
        fields = '__all__'
