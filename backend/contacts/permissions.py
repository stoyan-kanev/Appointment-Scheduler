from rest_framework.permissions import BasePermission

class ContactPermission(BasePermission):
    def has_permission(self, request, view):
        # Public: allow creating tickets
        if view.action == "create":
            return True

        # Staff-only for list / retrieve / close / delete / update
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
