from django.urls import path

from barbers.views import BarbersView, ListBarbersView

urlpatterns = [

    path('', BarbersView.as_view(), name='create'),
    path('list/', ListBarbersView.as_view(), name='list-barbers'),


]