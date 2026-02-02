from rest_framework.serializers import ModelSerializer

from barbers.models import BarbersModel


class BarbersSerializer(ModelSerializer):
    class Meta:
        model = BarbersModel
        fields = '__all__'
        read_only_fields = ('id',)

class ListBarbersSerializer(ModelSerializer):
    class Meta:
        model = BarbersModel
        fields = ['id','name','role','image']
        read_only_fields = ('id',)


