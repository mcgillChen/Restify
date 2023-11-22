from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView
# from django.views.generic import CreateAPIView

from rest_framework import generics
# from ..serializers import UserSerializer, GroupSerializer, PropCreateSerializer
from ..serializers import PropCreateSerializer, AmenitySerializer

from ..models import PropData, Amenity
from rest_framework.permissions import IsAuthenticated


class getAmenity(ListAPIView):

    # permission_classes = [IsAuthenticated]
    # model = PropData
    # fields = '__all__'
    # exclude = ['PropRentModeData']
    # permission_classes = [IsAuthenticated]

    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer

    # # # permission_classes = (is_Authenticated, )
    # def create(self, request):
    #     # user = request.user

    #     propdata = PropCreateSerializer()
    #     # proprentdata = PropRentCreateSerializer(context={'prop_id': propdata.id})

    #     return Response(status=204)
