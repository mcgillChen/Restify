from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, ListCreateAPIView
# from django.views.generic import CreateAPIView

from rest_framework import generics
# from ..serializers import UserSerializer, GroupSerializer, PropCreateSerializer
from ..serializers import PropCreateSerializer, AmenitySerializer, ActivatePropSerializer

from ..models import PropData, Amenity, ActiveProp
from rest_framework.permissions import IsAuthenticated


class ActiveateProp(ListCreateAPIView):

    queryset = ActiveProp.objects.all()
    serializer_class = ActivatePropSerializer

 
