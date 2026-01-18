from django.urls import path

from barbers.views import BarbersView

urlpatterns = [

    path('', BarbersView.as_view(), name='create'),

]