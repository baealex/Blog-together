from django.utils.deprecation import MiddlewareMixin
from django.urls import reverse
from django.http import Http404

class DisableCSRF(MiddlewareMixin):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)

class AccessAdminOnlyStaff(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith(reverse('admin:index')):
            if not request.user.is_active:
                raise Http404
            if not request.user.is_staff:
                raise Http404