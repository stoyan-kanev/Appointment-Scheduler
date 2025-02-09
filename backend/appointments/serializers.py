from django.utils.timezone import activate, localtime
from rest_framework import serializers

from appointments.models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    date_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M", input_formats=["%Y-%m-%d %H:%M", "%d.%m.%Y %H:%M"])

    class Meta:
        model = Appointment
        fields = '__all__'
