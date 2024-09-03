from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid
from django.conf import settings

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('staff', 'Staff')])

    def __str__(self):
        return f"{self.user.username} ({self.role})"

class Customer(models.Model):
    customer_id = models.CharField(max_length=100, primary_key=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    email = models.EmailField()
    telephone = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    postcode = models.CharField(max_length=10)
    specific_needs = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Staff(models.Model):
    staff_id = models.CharField(max_length=100, primary_key=True)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    email = models.EmailField()
    dob = models.DateField()
    telephone = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    postcode = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Shift(models.Model):
    shift_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    staff_id= models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='shifts', null=True, blank=True)
    shift_name = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    address = models.CharField(max_length=50)
    postcode = models.CharField(max_length=10)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('declined', 'Declined')], default='pending')
    assigned_date = models.DateField(null=True, blank=True)
    is_open = models.BooleanField(default=True)


    def __str__(self):
        return f"{self.shift_name} on {self.date}"

class Rota(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"Rota for {self.staff} on {self.date}"

class Timesheet(models.Model):
    timesheet_id = models.CharField(max_length=100, primary_key=True)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    date = models.DateField()
    clock_in_time = models.TimeField(null=True, blank=True)
    clock_out_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"Timesheet for {self.staff} on {self.date}"
    
class BillingAndInvoice(models.Model):
    invoice_id = models.CharField(max_length=100, primary_key=True)
    date_issued = models.DateField()
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    services_rendered = models.TextField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return f"Invoice {self.invoice_id}"
    
class ServiceAgreement(models.Model):
    agreement_id = models.CharField(max_length=100, primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    details = models.TextField()

    def __str__(self):
        return f"Agreement {self.agreement_id}"

class WorkPlan(models.Model):
    work_plan_id = models.CharField(max_length=100, primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    plan_details = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return f"Work Plan {self.work_plan_id}"

