from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from tenant.views.token_views import MyTokenObtainPairView

schema_view = get_schema_view(
    openapi.Info(
        title="NexaTask API",
        default_version="v1",
        description="API for NexaTask",
        contact=openapi.Contact(email="Nsohcarl.99@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("tenant.urls")),
    re_path(r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("docs/swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("docs/redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Use custom view here
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
