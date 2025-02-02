from django.contrib.auth import authenticate
from django.http import HttpResponse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers import UserSerializer, LoginSerializer


class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "User registered successfully"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = authenticate(username=username, password=password)

            if user:
                if not user.is_active:
                    return Response({'error': 'User account is disabled'}, status=status.HTTP_403_FORBIDDEN)

                token, _ = Token.objects.get_or_create(user=user)

                user_data = UserSerializer(user).data

                response = Response(user_data, status=status.HTTP_200_OK)
                response.set_cookie('token', str(token))
                return response


            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
