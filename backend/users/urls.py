from django.urls import path

from users.views import UserRegisterView

urlpatterns = [
    path('create', UserRegisterView.as_view(), name='index'),
]