from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
# from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
# from django.views.generic import CreateAPIView
from django.db.models import Q

from rest_framework import generics
# from ..serializers import UserSerializer, GroupSerializer, PropCreateSerializer
from ..serializers import PropCreateSerializer, PropImageSerializer
from ..serializers import PropSearchSerializer, PropQuerySerializer, UserPropSerializer

from ..models import PropData, Amenity, PropQuery, PropImage

import logging
logger = logging.getLogger('django')
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination



# from django.core.paginator import Paginator

# from django.shortcuts import render 
# from myapp.models import Contact

# def listing(request):
#     contact_list = Contact.objects.all()    
#     paginator = Paginator(contact_list, 25) # Show 25 contacts per page.     
#     page_number = request.GET.get('page')    
#     page_obj = paginator.get_page(page_number)    
#     return render(request, 'list.html', {'page_obj': page_obj})
from rest_framework.parsers import MultiPartParser, FormParser

class retrieveImage(ListCreateAPIView):
    serializer_class = PropImageSerializer
    queryset = PropImage.objects.all()
    parser_classes = (MultiPartParser, FormParser)


    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class updateImages(RetrieveUpdateDestroyAPIView):
    serializer_class = PropImageSerializer
    # queryset = PropImage.objects.all()
    pk_url_kwarg = 'pk'


    def get_queryset(self):
        input_pid = self.kwargs.get(self.pk_url_kwarg)
        result =  PropImage.objects.filter(pid = input_pid)

        print(result)
        return result

