# from django.contrib.auth.models import AbstractUser
# from django.db import models

# class CustomUser(AbstractUser):
#     is_staff_member = models.BooleanField(default=False)  # Identifies if the user is a staff member
#     is_admin = models.BooleanField(default=False)  # True for admins, False for regular users
#     phone_number = models.CharField(max_length=15, blank=True, null=True)
#     address = models.TextField(blank=True, null=True)
#     date_of_birth = models.DateField(null=True, blank=True)
#     emergency_contact = models.CharField(max_length=100, blank=True, null=True)
#     emergency_phone = models.CharField(max_length=15, blank=True, null=True)
#     # You can use the built-in is_active field to manage active/inactive users
