from django.urls import path

from users.views import UserRegisterView, UserLoginView

urlpatterns = [
    path('register', UserRegisterView.as_view(), name='index'),
    path('login', UserLoginView.as_view(), name='index'),
]