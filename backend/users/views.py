from django.contrib.auth import authenticate
from django.http import HttpResponse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
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

                response = Response({"user": user_data}, status=status.HTTP_200_OK)

                # 🔴 ТУК Е ВАЖНОТО – сетваме token в cookie
                response.set_cookie(
                    'token',
                    str(token),
                    httponly=True,   # JS не може да го чете -> по-сигурно
                    samesite='Lax',  # достатъчно за SPA на същия домейн
                    secure=False,    # True в production с HTTPS
                )

                return response

            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_user_from_cookie(request):
    token_key = request.COOKIES.get('token')
    if not token_key:
        return None
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return None


@api_view(['GET'])
def verify_token(request):
    user = get_user_from_cookie(request)
    if not user:
        return Response({'error': 'Token missing or invalid'}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({'message': 'Token is valid', 'user': user.username}, status=200)

@api_view(['POST'])
def logout(request):
    response = Response({"message": "Logged out"}, status=status.HTTP_200_OK)
    response.delete_cookie('token')
    return response


