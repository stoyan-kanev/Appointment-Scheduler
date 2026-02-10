from django.shortcuts import render
from django.views.generic import ListView
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from barbers.models import BarbersModel
from barbers.serialiozer import BarbersSerializer, ListBarbersSerializer


# Create your views here.


class BarbersView(APIView):
    permission_classes = (AllowAny,)


    def get(self, request):
        qs = BarbersModel.objects.all()
        serializer = BarbersSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BarbersSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request):
        barbers = BarbersModel.objects.all()
        return Response({'barbers': barbers})

    def patch(self, request):
        barbers = BarbersModel.objects.all()
        return Response({'barbers': barbers})

    def delete(self, request):
        barbers = BarbersModel.objects.all()
        return Response({'barbers': barbers})



class ListBarbersView(APIView):
    permission_classes = (AllowAny,)
    queryset = BarbersModel.objects.all()
    serializer_class = ListBarbersSerializer

    def get(self, request):
        barbers = BarbersModel.objects.all()
        serializer = ListBarbersSerializer(barbers, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


