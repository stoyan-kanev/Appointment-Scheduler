from django.urls import path

from appointments.views import AppointmentViewSet, GetSignalerAppointment

urlpatterns = [
    path('', AppointmentViewSet.as_view(), name='appointments'),
    path('<int:id>', GetSignalerAppointment.as_view(), name='appointments'),
]
