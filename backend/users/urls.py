from django.urls import path

from users.views import UserRegisterView, UserLoginView, verify_token, logout

urlpatterns = [
    path('register', UserRegisterView.as_view(), name='index'),
    path('login', UserLoginView.as_view(), name='index'),
    path('verify-token', verify_token, name='verify-token'),
    path('logout', logout, name='logout'),

]
