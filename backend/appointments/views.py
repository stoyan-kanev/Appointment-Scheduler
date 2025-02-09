from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Appointment
from .serializers import AppointmentSerializer
from datetime import datetime

class AppointmentViewSet(APIView):
    serializer_class = AppointmentSerializer

    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetSignalerAppointment(APIView):
    def get(self, request, id):
        appointment = Appointment.objects.get(id=id)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    def put(self, request, id):
        appointment = Appointment.objects.get(id=id)
        serializer = AppointmentSerializer(appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        appointment = Appointment.objects.get(id=id)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GetReservedSlots(APIView):

    def get(self, request, date):
        try:
            date_obj = datetime.strptime(date, "%d.%m.%Y").date()
            reserved_appointments = Appointment.objects.filter(date_time__date=date_obj)
            reserved_slots = [appt.date_time.strftime("%H:%M") for appt in reserved_appointments]
            return Response({"reserved_slots": reserved_slots})
        except ValueError:
            return Response({"error": "Invalid date format. Expected DD.MM.YYYY"}, status=400)
