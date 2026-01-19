from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from contacts.models import Contact
from contacts.serializers import ContactSerializer
from contacts.permissions import ContactPermission


class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    permission_classes = [ContactPermission]

    def get_queryset(self):
        qs = Contact.objects.all().order_by("-created_at")

        # hide deleted by default
        include_deleted = self.request.query_params.get("include_deleted")
        if not include_deleted:
            qs = qs.filter(is_deleted=False)

        # filter open/closed
        status_param = self.request.query_params.get("status")
        if status_param == "open":
            qs = qs.filter(is_active=True)
        elif status_param == "closed":
            qs = qs.filter(is_active=False)

        return qs

    @action(detail=True, methods=["patch"], url_path="close")
    def close(self, request, pk=None):
        contact = self.get_object()

        if not contact.is_active:
            return Response({"detail": "Already closed."}, status=status.HTTP_400_BAD_REQUEST)

        contact.is_active = False
        contact.closed_at = timezone.now()
        contact.save(update_fields=["is_active", "closed_at"])

        return Response(self.get_serializer(contact).data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        contact = self.get_object()
        contact.is_deleted = True
        contact.deleted_at = timezone.now()
        contact.save(update_fields=["is_deleted", "deleted_at"])
        return Response(status=status.HTTP_204_NO_CONTENT)
