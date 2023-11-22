from django.db import models
from django.contrib.auth.models import User
from accounts.models import Profile
from property.models import PropData, Amenity, PropQuery

# Create your models here.


class Reservation(models.Model):
    # ('db_var_name', 'human-readable')
    STATUS_CHOICES = (('PENDING', 'pending'), ('DENIED', 'denied'),
                      ('EXPIRED', 'expired'), ('APPROVED', 'approved'),
                      ('TERMINATED', 'terminated'), ('COMPLETED', 'completed'), ('PENDINGCANCELLED', 'pendingcancelled'), ('CANCELED', 'canceled'),)

    USER_TYPE_CHOICES = (('HOST', 'host'), ('GUEST', 'guest'))

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    # user_type = models.CharField(
    #     max_length=30, choices=USER_TYPE_CHOICES)
    property = models.ForeignKey(
        PropData, on_delete=models.CASCADE, null=True, blank=True)
    checkin_date = models.DateField(null=True, default=None)
    checkout_date = models.DateField(null=True, default=None)
    number_of_guests = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=30, choices=STATUS_CHOICES, default='PENDING')
    special_request = models.TextField(
        max_length=3000, null=True, blank=True, default=" ")

    # TODO changeback when fix property
    def __str__(self):
        return '%d: %s (%s) (%s)' % (self.id, self.user.first_name, self.status, self.property.title)
    #! USER THIS IF PROPERTY BROKE db
    # def __str__(self):
    #     return ' %d: %s (%s)' % (self.id, self.user.first_name, self.status)
