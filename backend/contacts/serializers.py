from rest_framework import serializers
from contacts.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
        read_only_fields = (
            "id",
            "is_active",
            "is_deleted",
            "created_at",
            "closed_at",
            "deleted_at",
        )

    def create(self, validated_data):
        validated_data["is_active"] = True
        validated_data["is_deleted"] = False
        return super().create(validated_data)
