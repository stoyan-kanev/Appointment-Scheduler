from rest_framework.serializers import ModelSerializer

from barbers.models import BarbersModel


class BarbersSerializer(ModelSerializer):
    class Meta:
        model = BarbersModel
        fields = '__all__'
        read_only_fields = ('id',)

