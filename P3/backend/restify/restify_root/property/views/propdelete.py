from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
# from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, ListCreateAPIView
# from django.views.generic import CreateAPIView
from django.db.models import Q

from rest_framework import generics
# from ..serializers import UserSerializer, GroupSerializer, PropCreateSerializer
from ..serializers import PropCreateSerializer
from ..serializers import PropSearchSerializer, PropQuerySerializer

from ..models import PropData, Amenity, PropQuery

import logging
logger = logging.getLogger('django')
