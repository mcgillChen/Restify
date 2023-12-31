# Generated by Django 4.1.6 on 2023-04-18 19:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("property", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Reservation",
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
                ("checkin_date", models.DateField(default=None, null=True)),
                ("checkout_date", models.DateField(default=None, null=True)),
                ("number_of_guests", models.IntegerField()),
                ("total_price", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("PENDING", "pending"),
                            ("DENIED", "denied"),
                            ("EXPIRED", "expired"),
                            ("APPROVED", "approved"),
                            ("TERMINATED", "terminated"),
                            ("COMPLETED", "completed"),
                            ("PENDINGCANCELLED", "pendingcancelled"),
                            ("CANCELED", "canceled"),
                        ],
                        default="PENDING",
                        max_length=30,
                    ),
                ),
                (
                    "special_request",
                    models.TextField(
                        blank=True, default=" ", max_length=3000, null=True
                    ),
                ),
                (
                    "property",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="property.propdata",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
