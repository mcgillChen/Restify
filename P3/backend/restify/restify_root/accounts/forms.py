from django import forms
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.core.exceptions import ValidationError
from . models import *


# class RegistrationForm(UserCreationForm):
#     # Modifies the default UserCreationForm
#     password1 = forms.CharField(widget=forms.PasswordInput, label="Password",
#                                 error_messages={
#                                     'required': 'This field is required',
#                                     'password_too_common': '',
#                                 })
#     password2 = forms.CharField(widget=forms.PasswordInput, label="Password confirmation",
#                                 error_messages={
#                                     'required': 'This field is required',
#                                     'password_too_common': '',
#                                 })
#     phone_number = forms.CharField(label="Phone Number",
#                                    error_messages={
#                                        'required': 'This field is required',
#                                    })

#     class Meta:
#         model = get_user_model()
#         fields = ['username', 'password1', 'password2',
#                   'email', 'first_name', 'last_name', 'phone_number']
#         # fields = UserCreationForm.Meta.fields + ('phone_number',)

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)


# class LoginForm(forms.Form):
#     username = forms.CharField(max_length=150, error_messages={
#         'required': 'Username or password is invalid',
#     })
#     password = forms.CharField(widget=forms.PasswordInput(), error_messages={
#         'required': 'Username or password is invalid',
#     })

#     def clean(self):
#         data = super().clean()
#         if (self.cleaned_data.get('username') is None):
#             raise ValidationError({
#                 'username': 'Username or password is invalid'}
#             )
#         elif (self.cleaned_data.get('password') is None):
#             raise ValidationError({
#                 'password': 'Username or password is invalid'}
#             )
#         else:
#             user = authenticate(
#                 username=data['username'], password=data['password'])
#             if not user:
#                 raise ValidationError({
#                     'username': 'Username or password is invalid'}
#                 )
#             data['user'] = user
#             return data
