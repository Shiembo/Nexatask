# middleware.py
from django.http import HttpResponse
from django.conf import settings
from .models import Tenant


class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # List of paths that should bypass tenant check
        bypass_paths = ['/api/token/', '/api/login/', '/admin/,']  # Update this list as needed

        # Bypass tenant check for specified paths
        if any(request.path.startswith(bp) for bp in bypass_paths):
            pass
        else:
            if settings.USE_SUBDOMAINS:
                # Production logic to identify tenant by subdomain
                host = request.get_host().split('.')
                subdomain = host[0] if len(host) >= 3 else None  # Adjust based on your domain structure
                try:
                    request.tenant = Tenant.objects.get(subdomain=subdomain) if subdomain else None
                except Tenant.DoesNotExist:
                    return HttpResponse("Tenant not found", status=404)
            else:
                # Development logic to identify tenant by 'X-Tenant-ID' header
                tenant_id = request.headers.get('X-Tenant-ID')
                if not tenant_id:
                    return HttpResponse("No tenant ID provided", status=400)
                try:
                    request.tenant = Tenant.objects.get(tenant_id=tenant_id)
                except Tenant.DoesNotExist:
                    return HttpResponse("Tenant not found", status=404)

        response = self.get_response(request)
        return response






# # middleware.py
# from .models import Tenant

# class TenantMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         host = request.get_host().split('.')
#         subdomain = host[0] if len(host) > 2 else None
#         request.tenant = Tenant.objects.get(subdomain=subdomain) if subdomain else None
#         response = self.get_response(request)
#         return response
