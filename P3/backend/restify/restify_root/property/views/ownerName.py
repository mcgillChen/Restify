from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
# from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, ListCreateAPIView, RetrieveAPIView
# from django.views.generic import CreateAPIView
from django.db.models import Q

from rest_framework import generics
# from ..serializers import UserSerializer, GroupSerializer, PropCreateSerializer
from ..serializers import PropCreateSerializer, UserSerializer
from ..serializers import PropSearchSerializer, PropQuerySerializer, UserPropSerializer

from ..models import PropData, Amenity, PropQuery
from django.contrib.auth.models import User


import logging
logger = logging.getLogger('django')
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination



class propOwner(RetrieveAPIView):

    # permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = UserSerializer
    # pagination_class = PageNumberPagination
    # _paginator = PageNumberPagination
    pk_url_kwarg = 'pk'


    def get_queryset(self):
        # data = self.request.data
        uid = self.kwargs.get(self.pk_url_kwarg)

        return User.objects.filter(id=uid)

