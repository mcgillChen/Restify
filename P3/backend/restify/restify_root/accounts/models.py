from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

# extends default django User model


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, blank=True, null=True)
    phone_number = models.CharField(
        null=True, blank=True, max_length=10)
    profile_image = models.ImageField(
        null=True, upload_to='profile-pics/')

    def __str__(self):
        return str(self.user.username)

# class Icon(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     icon = models.ImageField(upload_to=upload_to)
