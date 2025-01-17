# Generated by Django 4.2.9 on 2024-03-06 00:14

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("tenant", "0003_customer_shift_staff_workplan_timesheet_shift_staff_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="tenant",
            name="id",
        ),
        migrations.AddField(
            model_name="tenant",
            name="tenant_id",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, primary_key=True, serialize=False
            ),
        ),
    ]
