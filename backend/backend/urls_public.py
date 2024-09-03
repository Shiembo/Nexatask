# backend/urls_public.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('public-admin/', admin.site.urls),
    # Add other URL patterns for public views here
]
