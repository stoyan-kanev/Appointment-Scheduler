from rest_framework import serializers

from appointments.models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    date_time = serializers.DateTimeField(format="%d.%m.%Y %H:%M", input_formats=["%d.%m.%Y %H:%M"])

    class Meta:
        model = Appointment
        fields = "__all__"