from django.contrib import admin
from django.urls import path
#from nexatask.views.user_views import user_view
from tenant.views.staff_views import staff_view
from tenant.views.customer_views import customer_view
from tenant.views.shift_views import shift_view
from tenant.views.book_shift_views import book_shift
#from nexatask.views.user_profiles_views import user_profile_view

#from .views.user_login_views import login_view
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("api/staff", staff_view, name="staff-view"),
    path("api/customer", customer_view, name="customer-view"),
   # path("api/user", user_view, name="user-view"),
    path("api/shift/", shift_view, name="shift-view"),
    path('api/shift/<uuid:shift_id>/', shift_view, name='shift-view'),  # For UUIDs
    path('api/shift/<uuid:shift_id>/book/', book_shift, name='book_shift'),

    
    #path('api/login', login_view, name='login'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    #path("api/user_profile", user_profile_view, name="user-profile-view"),
    
]
