from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from rest_framework.validators import *


from .models import *


class ProfileSerializer(ModelSerializer):
    phone_number = serializers.CharField(
        required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Profile
        fields = ['phone_number']


class UserSerializer(ModelSerializer):
    profile = ProfileSerializer(many=False)  # one profile per user

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'profile']


class UserRegisterSerializer(ModelSerializer):
    profile = ProfileSerializer(many=False)  # one profile per user
    password = serializers.CharField(
        write_only=True, required=False, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'password', 'password2', 'profile']

    def validate(self, attrs):
        '''
            check password and password2 mismatch
        '''
        password = attrs.get('password')
        # user model does not have password2, so pop it
        password2 = attrs.pop('password2')
        if password != password2:
            raise serializers.ValidationError(
                {"password": "Password1 and Password2 mismatch"})

        return attrs

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        Profile.objects.create(user=user, **profile_data)
        user.save()
        return user

class UserIconSerializer(ModelSerializer):

    profile_image = serializers.ImageField()
    class Meta:
        model = Profile
        fields=["profile_image"]
        


# class UserUpdateSerializer(ModelSerializer):
#     profile = ProfileSerializer(
#         many=False, partial=True)  # one profile per user

#     email = serializers.EmailField(
#         write_only=True, required=False, allow_blank=True, allow_null=True)
#     password = serializers.CharField(
#         write_only=True, required=False, validators=[validate_password], allow_blank=True, allow_null=True)
#     password2 = serializers.CharField(
#         write_only=True, required=False, allow_blank=True, allow_null=True)
#     username = serializers.CharField(
#         write_only=True, required=False, allow_blank=True, allow_null=True)
#     first_name = serializers.CharField(
#         write_only=True, required=False, allow_blank=True, allow_null=True)
#     last_name = serializers.CharField(
#         write_only=True, required=False, allow_blank=True, allow_null=True)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'first_name',
#                   'last_name', 'email', 'password', 'password2', 'profile']
#         read_only_fields = ['id']
#         # extra_kwargs = {'profile': {'required': False,
#         #                             'allow_null': True, 'allow_blank': True}}

#     def validate(self, attrs):

#         password = attrs.get('password')
#         password2 = attrs.pop('password2')

#         if password != password2:
#             raise serializers.ValidationError(
#                 {"password": "Password1 and Password2 mismatch"})
#         return attrs

#     # ?field level validators: def validate_<field_name>
#     # def validate_username(self, attrs):
#     #     return super().validate(attrs)

#     # def validate_email(self, attrs):
#     #     return super().validate(attrs)

#     # def validate_number(self, attrs):
#     #     return super().validate(attrs)

#     # reference: https://www.django-rest-framework.org/api-guide/serializers/#field-level-validation
#     def update(self, instance, validated_data):
#         profile_data = validated_data.pop('profile')
#         profile = instance.profile
#         profile.phone_number = profile_data.get(
#             'phone_number',
#             profile.phone_number
#         )

#         instance.username = validated_data.get('username', instance.username)
#         instance.email = validated_data.get('email', instance.email)
#         instance.first_name = validated_data.get(
#             'first_name', instance.first_name)
#         instance.last_name = validated_data.get(
#             'last_name', instance.last_name)

#         # done editing, save the two instances
#         instance.save()
#         profile.save()

#         # edit password
#         # user = User.objects.create(**validated_data)
#         # user.set_password(validated_data['password'])
#         # Profile.objects.create(user=user, **profile_data)
#         # user.save()
#         return instance
class UserUpdateSerializer(ModelSerializer):
    profile = ProfileSerializer(
        required=False, partial=True)  # one profile per user

    email = serializers.EmailField(
        write_only=True, required=False, allow_blank=True, allow_null=True)
    password = serializers.CharField(
        write_only=True, required=False, validators=[validate_password], allow_blank=True, allow_null=True)
    password2 = serializers.CharField(
        write_only=True, required=False, allow_blank=True, allow_null=True)
    username = serializers.CharField(
        write_only=True, required=False, allow_blank=True, allow_null=True)
    first_name = serializers.CharField(
        write_only=True, required=False, allow_blank=True, allow_null=True)
    last_name = serializers.CharField(
        write_only=True, required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'password', 'password2', 'profile']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})  # For phone number

        # first_name = validated_data.pop('first_name')
        # last_name = validated_data.pop('last_name')
        # email = validated_data.pop('email')
        # username = validated_data.pop('username')

        # update profile.phone_number if is provided
        if profile_data:
            profile = instance.profile
            profile.phone_number = profile_data.get(
                'phone_number',
                profile.phone_number
            )
            profile.save()

        # # update password if is provided
        # if password:
        #     if password != password2:
        #         raise serializers.ValidationError(
        #             {"password": "Password1 and Password2 mismatch"})
        #     else:
        #         instance.set_password(password)

        # update password if is provided
        if 'password' in validated_data:
            password = validated_data.get('password')
            password2 = validated_data.get('password2')
            if password != password2:
                raise serializers.ValidationError(
                    {"password": "Password1 and Password2 mismatch"})
            else:
                instance.set_password(password)

        # instance.username = validated_data.get('username', instance.username)
        # instance.email = validated_data.get('email', instance.email)
        # instance.first_name = validated_data.get(
        #     'first_name', instance.first_name)
        # instance.last_name = validated_data.get(
        #     'last_name', instance.last_name)

        # if username:
        #     instance.username = validated_data.get(
        #         'username', instance.username)

        if 'email' in validated_data:
            instance.email = validated_data.get('email', instance.email)
        if 'first_name' in validated_data:
            instance.first_name = validated_data.get(
                'first_name', instance.first_name)
        if 'last_name' in validated_data:
            instance.last_name = validated_data.get(
                'last_name', instance.last_name)

        # done editing, save the two instances
        instance.save()

        return instance
