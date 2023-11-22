from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth.models import User

from .models import *
from accounts.serializers import *
from accounts.models import *
from property.models import *
from property.serializers import *

from django.core.exceptions import ObjectDoesNotExist

import datetime


class ReservationSerializer(ModelSerializer):
    user = UserSerializer(many=False)
    property = PropCreateSerializer(many=False)

    class Meta:
        model = Reservation
        fields = '__all__'


class ReservationCreationSerializer(ModelSerializer):
    # property = PropCreateSerializer(many=False)
    # property = PropSerializer(many=False)
    # property = PropSearchSerializer(many=False)
    propid = serializers.CharField(write_only=True)

    class Meta:
        model = Reservation
        # default reservation creation has status "pending"

        # fields = ['checkin_date', 'checkout_date',
        #           'number_of_guests', 'special_request', 'total_price', 'user', 'property']
        fields = ['checkin_date', 'checkout_date',
                  'number_of_guests', 'special_request', 'total_price', 'user', 'propid']
        #   'property'

    def create(self, validated_data):
        # set user to request.user
        validated_data['user'] = self.context['request'].user
        print("=============Validated Data=================")
        print(validated_data)
        print("============================================")

        ''''''
        # get property by property_title
        # property_data = validated_data.pop('property')
        property_data = int(validated_data.pop('propid'))
        print("Propid: ", property_data)
        # property_title = property_data.get('title')
        # print("property_title: ", property_title)
        try:
            property_data = PropData.objects.get(id=property_data)
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                "INVALID: Property Does Not Exist")
        validated_data['property'] = property_data
        print("Property total guests: ", property_data.total_guests)

        print("=========Date Validations====================")
        #! 1. check if checkin date is before checkout date
        checkin_date = validated_data['checkin_date']
        print("Checkin date: ", checkin_date)
        checkout_date = validated_data['checkout_date']
        print("Checkout date: ", checkout_date)
        if checkin_date > checkout_date:
            raise serializers.ValidationError(
                "INVALID: Checkin date must be before checkout date")

        # TODO: Check Date Clash and STATUS=CANCELLED, TERMINATED
        #! 2. Check if this date is reserved
        print("=========Check Double Booking====================")
        user = self.context['request'].user

        res_data = Reservation.objects.filter(
            property=property_data, checkin_date__gte=checkin_date, checkout_date__lte=checkout_date)
        # res_data = Reservation.objects.filter(
        #     checkin_date__gte=checkin_date, checkout_date__lte=checkout_date)
        print("res_data:", res_data)
        print("length of res_data: ", len(res_data))

        res_data = res_data.exclude(status="TERMINATED")
        res_data = res_data.exclude(status="CANCELED")
        print("After exclusion(!CANCELLED or !TERMINATED): res_data:", res_data)

        # TODO: Check Date Clash and STATUS=CANCELLED, TERMINATED
        for res in res_data:
            print(res.status)
            # if (res.status == "CANCELLED" or res.status == "TERMINATED"):
            #     print(res, "has status: ", res.status)

        if len(res_data) > 0:
            raise serializers.ValidationError("This date is not available")

        #! 3. Check if requested number of guest exceeds prop maximum
        number_of_guests = validated_data['number_of_guests']
        max_guest = property_data.total_guests
        print("Num of Guests", number_of_guests)
        print("Maximum guests for property: ", max_guest)
        if number_of_guests > max_guest:
            raise serializers.ValidationError(
                "The number of guests you entered has exceeded the maximum guest of the property")

        return super().create(validated_data)

        # #! property id is not a key for some reason
        property_data = validated_data.pop('property')
        print("Property_data: ", property_data)
        property_id = property_data.get('id')
        print("property_id: ", property_id)
        try:
            property_data = PropData.objects.get(id=property_id)
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                "INVALID: Property Does Not Exist")
        validated_data['property'] = property_data
        return super().create(validated_data)


class ReservationUpdateSerializer(ModelSerializer):
    class Meta:
        model = Reservation
        # default reservation creation has status "pending"
        fields = ['checkin_date', 'checkout_date',
                  'number_of_guests', 'status', 'special_request']
        optional_fields = ['checkin_date', 'checkout_date',
                           'number_of_guests', 'status', 'special_request']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class HostReservationUpdateSerializer(ModelSerializer):
    '''
    Host Status Action:
    Terminate

    Approve/Deny Pending-Reservations
    Approve/Deny Pending-Canceled-Reservations



    Completed


    '''

    STATUS_CHOICES = (
        ('PENDINGCANCELLED', 'pendingcancelled'),

        ('APPROVED', 'approved'),
        ('DENIED', 'denied'),
        ('TERMINATED', 'terminated'),
        ('CANCELED', 'canceled'),
        ('COMPLETED', 'completed'),
        ('EXPIRED', 'expired'),
    )

    status = serializers.ChoiceField(choices=STATUS_CHOICES)

    class Meta:
        model = Reservation
        # default reservation creation has status "pending"
        fields = ['status']
        # extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

        # optional_fields = ['checkin_date', 'checkout_date',
        #                    'number_of_guests', 'status', 'special_request']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class GuestReservationUpdateSerializer(ModelSerializer):
    '''
    User Status Action:
    Cancelled-pending
    Completed

    '''

    STATUS_CHOICES = (
        ('PENDINGCANCELLED', 'pendingcancelled'),
        ('CANCELED', 'canceled'),
        ('COMPLETED', 'completed'),
        ('EXPIRED', 'expired'),
    )

    status = serializers.ChoiceField(choices=STATUS_CHOICES)

    class Meta:
        model = Reservation
        # default reservation creation has status "pending"
        fields = ['status']
        # extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

        # optional_fields = ['checkin_date', 'checkout_date',
        #                    'number_of_guests', 'status', 'special_request']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
