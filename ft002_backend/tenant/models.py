from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
import uuid

class Tenant (models.Model):
    tenant_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # New UUID field as primary key
    name = models.CharField(max_length=255)
    subdomain = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
    
class TenantAwareModel(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)

    class Meta:
        abstract = True

   
class Member(TenantAwareModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='member', null=True, blank=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('staff', 'Staff')], default='admin')


    def __str__(self):
        return self.name




class Customer(TenantAwareModel):
    customer_id = models.CharField(max_length=100, primary_key=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    email = models.EmailField()
    telephone = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    postcode = models.CharField(max_length=10)
    specific_needs = models.TextField()

class Staff(TenantAwareModel):
    staff_id = models.CharField(max_length=100, primary_key=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    email = models.EmailField()
    dob = models.DateField()
    telephone = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    postcode = models.CharField(max_length=10)

class Shift(TenantAwareModel):
    shift_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='shifts', null=True, blank=True)
    shift_name = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    address = models.CharField(max_length=50)
    postcode = models.CharField(max_length=10)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('declined', 'Declined')], default='pending')
    assigned_date = models.DateField(null=True, blank=True)
    is_open = models.BooleanField(default=True)

class Rota(TenantAwareModel):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    shift_name = models.ForeignKey(Shift, on_delete=models.CASCADE)
    date = models.DateField()

class Timesheet(TenantAwareModel):
    timesheet_id = models.CharField(max_length=100, primary_key=True)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    shift_name = models.ForeignKey(Shift, on_delete=models.CASCADE)
    date = models.DateField()
    clock_in_time = models.TimeField(null=True, blank=True)
    clock_out_time = models.TimeField(null=True, blank=True)

class BillingAndInvoice(TenantAwareModel):
    invoice_id = models.CharField(max_length=100, primary_key=True)
    date_issued = models.DateField()
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    services_rendered = models.TextField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

class ServiceAgreement(TenantAwareModel):
    agreement_id = models.CharField(max_length=100, primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    details = models.TextField()

class WorkPlan(TenantAwareModel):
    work_plan_id = models.CharField(max_length=100, primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)  # Assuming staff is responsible for the work plan
    plan_details = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
