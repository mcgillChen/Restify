# Generated by Django 4.1.7 on 2023-04-13 02:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0002_alter_reservation_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='status',
            field=models.CharField(choices=[('PENDING', 'pending'), ('DENIED', 'denied'), ('EXPIRED', 'expired'), ('APPROVED', 'approved'), ('TERMINATED', 'terminated'), ('COMPLETED', 'completed'), ('PENDINGCANCELLED', 'pendingcancelled'), ('CANCELED', 'canceled')], default='PENDING', max_length=30),
        ),
    ]
