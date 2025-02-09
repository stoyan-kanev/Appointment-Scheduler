from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_datetime
from rest_framework import status
from .serializers import AppointmentSerializer
from django.utils.timezone import make_aware, get_current_timezone
from django.utils.timezone import localtime
from datetime import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from appointments.models import Appointment


class AppointmentViewSet(APIView):
    serializer_class = AppointmentSerializer

    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        print("🔹 Raw Data Received from Angular:", data)

        if "date_time" in data:
            parsed_datetime = parse_datetime(data["date_time"])
            print("🔹 Parsed Datetime:", parsed_datetime)

            if parsed_datetime:
                if parsed_datetime.tzinfo is None:
                    parsed_datetime = make_aware(parsed_datetime, timezone=get_current_timezone())

                data["date_time"] = parsed_datetime
                print("🔹 Final Datetime Sent for Saving:", parsed_datetime)

        serializer = AppointmentSerializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()
            print(
                f"SAVED TO DATABASE: ID={instance.id}, DATE={instance.date_time}, Timezone={instance.date_time.tzinfo}")  # ✅ Log saved entry
            return Response(AppointmentSerializer(instance).data, status=status.HTTP_201_CREATED)

        print("Validation Error:", serializer.errors)
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
            date_obj = datetime.strptime(date, "%Y-%m-%d").date()

            reserved_appointments = Appointment.objects.filter(date_time__date=date_obj)

            reserved_slots = [localtime(appt.date_time).strftime("%H:%M") for appt in reserved_appointments]

            print(f"🔹 Corrected Reserved Slots for {date}: {reserved_slots}")

            return Response({"reserved_slots": reserved_slots})
        except ValueError:
            return Response({"error": "Invalid date format. Expected YYYY-MM-DD"}, status=400)


class GetAppointmentByDateTime(APIView):
    def get(self, request, date, time):
        try:
            date_obj = datetime.strptime(date, "%Y-%m-%d").date()

            time_obj = datetime.strptime(time, "%H:%M").time()

            appointment = get_object_or_404(Appointment, date_time__date=date_obj, date_time__time=time_obj)

            serializer = AppointmentSerializer(appointment)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ValueError:
            return Response({"error": "Invalid date or time format. Expected YYYY-MM-DD and HH:MM"},
                            status=status.HTTP_400_BAD_REQUEST)
