from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from .models import *
from .serializers import *

from rest_framework.exceptions import PermissionDenied

# # Create your views here.
# # function-based view
#! For development purpose
# # ? shows all the reservations from every user


@api_view(['GET'])
def reservation_list(request):
    reservations = Reservation.objects.all()
    return Response([{
        'id': reservation.id,
        'first_name': reservation.user.first_name,
        'last_name': reservation.user.last_name,
        'checkin_date': reservation.checkin_date,
        'checkout_date': reservation.checkout_date,
        'number_of_guests': reservation.number_of_guests,
        'total_price': reservation.total_price,
        'status': reservation.status,
        'property_owner_first_name': reservation.property.owner.first_name,
        'property_owner_last_name': reservation.property.owner.last_name,


    } for reservation in reservations])


class UserReservationView(ListAPIView):
    '''
    All the reservations by request.user: Unfiltered
    '''
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer

    def get_queryset(self):  # user can only see their own profile
        return Reservation.objects.filter(user=self.request.user)


class UserReservationFilterView(ListAPIView):
    '''
    Filtered Reservations by: user_type or/and status
    '''
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer

    def get_queryset(self):  # user can only see their own profile

        # get list of reservations for this user only
        # queryset = Reservation.objects.filter(user=self.request.user)
        queryset = Reservation.objects.all()

        # get parameters from url
        # e.g. http://127.0.0.1:8000/reservations/reservations-details-all/filter?status=APPROVED
        usertype = self.request.query_params.get('usertype')
        status = self.request.query_params.get('status')

        print("usertype: ", usertype)
        print("status: ", status)
        # filter by usertype
        if usertype is not None and (status is None):
            user = self.request.user
            user_id = user.id

            if usertype == 'HOST':
                queryset = Reservation.objects.all()
                for query in queryset:
                    property_owner_id = query.property.owner.id
                    print("property owner id: ", property_owner_id)

                    # user is owner of property-> is host
                    if user_id == property_owner_id:
                        print("You are the host")
                        continue
                    else:  # not the host, remove this reservation from the query set
                        queryset = queryset.exclude(id=query.id)
            elif usertype == 'GUEST':
                queryset = Reservation.objects.filter(user=self.request.user)
                print("Guest Queryset:", queryset)
                print("Total Number of Guest Reservations: ", len(queryset))
                for query in queryset:
                    property_owner_id = query.property.owner.id
                    print("property owner id: ", property_owner_id)

                    # user is not the owner of the property
                    if user_id != property_owner_id:
                        print("You are the guest")
                        continue
                    else:  # not the host, remove this reservation from the query set
                        queryset = queryset.exclude(id=query.id)
            print("Filtered by usertype")
        # filter by status
        if status is not None and (usertype is None):
            queryset = queryset.filter(status=status)
            print("Filtered by status")

        # filter by status and usertype
        if status is not None and (usertype is not None):
            user = self.request.user
            user_id = user.id

            if usertype == 'HOST':
                # queryset = Reservation.objects.all()
                for query in queryset:
                    property_owner_id = query.property.owner.id
                    print("property owner id: ", property_owner_id)

                    # user is owner of property-> is host
                    if user_id == property_owner_id:
                        print("You are the host")
                        continue
                    else:  # not the host, remove this reservation from the query set
                        queryset = queryset.exclude(id=query.id)
            elif usertype == 'GUEST':
                queryset = Reservation.objects.filter(user=self.request.user)
                for query in queryset:
                    property_owner_id = query.property.owner.id
                    print("property owner id: ", property_owner_id)

                    # user is not the owner of the property
                    if user_id != property_owner_id:
                        print("You are the guest")
                        continue
                    else:  # not the host, remove this reservation from the query set
                        queryset = queryset.exclude(id=query.id)

            queryset = queryset.filter(status=status)
            print("filtered by both", status, " and ", usertype)

        return queryset


# class UserReservationFilterView(ListAPIView):
#     '''
#     Filtered Reservations by: user_type or/and status
#     '''
#     permission_classes = [IsAuthenticated]
#     serializer_class = ReservationSerializer

#     def get_queryset(self):  # user can only see their own profile

#         # get list of reservations for this user only
#         queryset = Reservation.objects.filter(user=self.request.user)

#         # get parameters from url
#         # e.g. http://127.0.0.1:8000/reservations/reservations-details-all/filter?status=APPROVED
#         usertype = self.request.query_params.get('usertype')
#         status = self.request.query_params.get('status')

#         # filter by usertype
#         if usertype is not None and (status is None):
#             user = self.request.user
#             user_id = user.id

#             if usertype == 'HOST':
#                 for query in queryset:
#                     property_owner_id = query.property.owner.id
#                     print("property owner id: ", property_owner_id)

#                     # user is owner of property-> is host
#                     if user_id == property_owner_id:
#                         print("You are the host")
#                         continue
#                     else:  # not the host, remove this reservation from the query set
#                         queryset = queryset.exclude(id=query.id)
#             elif usertype == 'GUEST':
#                 for query in queryset:
#                     property_owner_id = query.property.owner.id
#                     print("property owner id: ", property_owner_id)

#                     # user is not the owner of the property
#                     if user_id != property_owner_id:
#                         print("You are the guest")
#                         continue
#                     else:  # not the host, remove this reservation from the query set
#                         queryset = queryset.exclude(id=query.id)

#         # filter by status
#         if status is not None and (usertype is None):
#             queryset = queryset.filter(status=status)

#         return queryset

#     def get(self, request, *args, **kwargs):
#         qs = self.get_queryset()
#         page = self.paginate_queryset(qs)
#         return self.get_paginated_response(page)


class UserReservationView(ListAPIView):
    '''
    All the reservations by request.user: Unfiltered
    '''
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer

    def get_queryset(self):  # user can only see their own profile
        return Reservation.objects.filter(user=self.request.user)


class UserReservationDetailView(ListAPIView):
    '''
    Get requested Reservation detail by <str:pk>
    '''
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer

    def get_queryset(self):  # user can only see their own profile

        # get list of reservations for this user only
        id = self.kwargs.get("pk")
        print("id: ", id)
        queryset = Reservation.objects.filter(user=self.request.user, id=id)

        return queryset


class CreateReservationView(CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationCreationSerializer
    # permission_classes = [IsAuthenticated]
    # TODO: Check date clashes


class UpdateReservationView(UpdateAPIView):
    serializer_class = ReservationUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get reservation id by url
        id = self.kwargs.get("pk")
        queryset = Reservation.objects.filter(user=self.request.user, id=id)
        return queryset

# class UpdateReservationView(UpdateAPIView):
#     serializer_class = ReservationUpdateSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # get reservation id by url
#         id = self.kwargs.get("pk")
#         queryset = Reservation.objects.filter(user=self.request.user, id=id)

#         #!Check if request.user is host or guest
#         # get request user id
#         user = self.request.user
#         user_id = user.id
#         print("BREAK")
#         # get property owner id
#         property_owner_id = queryset[0].property.owner.id
#         print("property owner id: ", property_owner_id)


#         if user_id != property_owner_id: #request user is a guest
#             raise PermissionDenied("You are not the Host")


#         return queryset


class HostUpdateReservationView(UpdateAPIView):
    '''
    Approve or deny by host
    '''
    serializer_class = HostReservationUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get reservation id by url
        res_id = self.kwargs.get("pk")
        print("res_id: ", res_id)
        queryset = Reservation.objects.filter(id=res_id)
        print("query_set: ", queryset)
        print(type(queryset))

        #! check if user is the host

        # get request user id
        user = self.request.user
        user_id = user.id
        print("BREAK")

        # get property owner id
        property_owner_id = queryset[0].property.owner.id
        print("property owner id: ", property_owner_id)

        # check if user is owner of property
        if user_id != property_owner_id:
            raise PermissionDenied("You are not the Host")
        print("You are the host")

        return queryset


class GuestUpdateReservationView(UpdateAPIView):
    '''
    Guest can cancel or complete the trip
    '''
    serializer_class = GuestReservationUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get reservation id by url
        res_id = self.kwargs.get("pk")
        queryset = Reservation.objects.filter(
            user=self.request.user, id=res_id)
        print("query_set: ", queryset)
        print(type(queryset))

        #! check if user is the host

        # get request user id
        user = self.request.user
        user_id = user.id
        print("BREAK")

        # get property owner id
        property_owner_id = queryset[0].property.owner.id
        print("property owner id: ", property_owner_id)

        # check if user is owner of property
        if user_id == property_owner_id:
            raise PermissionDenied("You are not the Guest")
        print("You are the Guest")

        return queryset
