
from django.contrib import admin
from django.urls import path
from .views.user_views import user_view
from .views.staff_views import staff_view
from .views.customer_views import customer_view
from .views.shift_views import shift_view
#from .views.user_login_views import login_view
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("api/staff", staff_view, name="staff-view"),
    path("api/customer", customer_view, name="customer-view"),
    path("api/user", user_view, name="user-view"),
    path("api/shift", shift_view, name="shift-view"),
    #path('api/login', login_view, name='login'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]