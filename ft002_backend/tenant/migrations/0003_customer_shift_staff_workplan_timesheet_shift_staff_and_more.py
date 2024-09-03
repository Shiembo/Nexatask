# Generated by Django 4.2.9 on 2024-02-22 21:14

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("tenant", "0002_member"),
    ]

    operations = [
        migrations.CreateModel(
            name="Customer",
            fields=[
                (
                    "customer_id",
                    models.CharField(max_length=100, primary_key=True, serialize=False),
                ),
                ("first_name", models.CharField(max_length=32)),
                ("last_name", models.CharField(max_length=32)),
                ("email", models.EmailField(max_length=254)),
                ("telephone", models.CharField(max_length=10)),
                ("address", models.CharField(max_length=100)),
                ("postcode", models.CharField(max_length=10)),
                ("specific_needs", models.TextField()),
                (
                    "tenant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.tenant"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Shift",
            fields=[
                (
                    "shift_id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("shift_name", models.CharField(max_length=100)),
                ("date", models.DateField()),
                ("start_time", models.TimeField()),
                ("end_time", models.TimeField()),
                ("address", models.CharField(max_length=50)),
                ("postcode", models.CharField(max_length=10)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("accepted", "Accepted"),
                            ("declined", "Declined"),
                        ],
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("assigned_date", models.DateField(blank=True, null=True)),
                ("is_open", models.BooleanField(default=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Staff",
            fields=[
                (
                    "staff_id",
                    models.CharField(max_length=100, primary_key=True, serialize=False),
                ),
                ("first_name", models.CharField(max_length=32)),
                ("last_name", models.CharField(max_length=32)),
                ("email", models.EmailField(max_length=254)),
                ("dob", models.DateField()),
                ("telephone", models.CharField(max_length=10)),
                ("address", models.CharField(max_length=100)),
                ("postcode", models.CharField(max_length=10)),
                (
                    "tenant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.tenant"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="WorkPlan",
            fields=[
                (
                    "work_plan_id",
                    models.CharField(max_length=100, primary_key=True, serialize=False),
                ),
                ("plan_details", models.TextField()),
                ("start_date", models.DateTimeField()),
                ("end_date", models.DateTimeField()),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="tenant.customer",
                    ),
                ),
                (
                    "staff",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.staff"
                    ),
                ),
                (
                    "tenant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.tenant"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Timesheet",
            fields=[
                (
                    "timesheet_id",
                    models.CharField(max_length=100, primary_key=True, serialize=False),
                ),
                ("date", models.DateField()),
                ("clock_in_time", models.TimeField(blank=True, null=True)),
                ("clock_out_time", models.TimeField(blank=True, null=True)),
                (
                    "shift",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.shift"
                    ),
                ),
                (
                    "staff",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.staff"
                    ),
                ),
                (
                    "tenant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.tenant"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="shift",
            name="staff",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="shifts",
                to="tenant.staff",
            ),
        ),
        migrations.AddField(
            model_name="shift",
            name="tenant",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="tenant.tenant"
            ),
        ),
        migrations.CreateModel(
            name="ServiceAgreement",
            fields=[
                (
                    "agreement_id",
                    models.CharField(max_length=100, primary_key=True, serialize=False),
                ),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                ("details", models.TextField()),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="tenant.customer",
                    ),
                ),
                (
                    "tenant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.tenant"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Rota",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date", models.DateField()),
                (
                    "shift",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.shift"
                    ),
                ),
                (
                    "staff",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.staff"
                    ),
                ),
                (
                    "tenant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.tenant"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="BillingAndInvoice",
            fields=[
                (
                    "invoice_id",
                    models.CharField(max_length=100, primary_key=True, serialize=False),
                ),
                ("date_issued", models.DateField()),
                ("amount_due", models.DecimalField(decimal_places=2, max_digits=10)),
                ("services_rendered", models.TextField()),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="tenant.customer",
                    ),
                ),
                (
                    "tenant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tenant.tenant"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
