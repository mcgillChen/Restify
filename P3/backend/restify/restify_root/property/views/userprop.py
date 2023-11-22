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
from ..serializers import PropSearchSerializer, PropQuerySerializer, UserPropSerializer

from ..models import PropData, Amenity, PropQuery

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

class userProp(ListAPIView):

    # permission_classes = [IsAuthenticated]

    queryset = PropData.objects.all()
    serializer_class = UserPropSerializer
    # pagination_class = PageNumberPagination
    # _paginator = PageNumberPagination
    pk_url_kwarg = 'pk'


    def get_queryset(self):
        # data = self.request.data
        uid = self.kwargs.get(self.pk_url_kwarg)

        return PropData.objects.filter(owner=uid)
   
    # def list(self, request, *args, **kwargs):

    #     # queryset1 = self.queryset.get(id=request)
    #     queryset1 = self.filter_queryset(self.get_queryset())
    #     request1 = request
    #     # print(type(queryset1))
    #     if type(queryset1) is str:
    #         return Response(data={'missin field':f"{queryset1}"},status=400)

    #     print(self.paginator)
    #     # pagination = PageNumberPagination()
    #     # pagination.page_size=4
    #     # pagination.page_query_param = 'page'

    #     page = self.paginate_queryset(queryset1)
    #     print(page)
    #     # if not page is None:
    #     #     print("yes pag")

    #     #     # serializer = self.get_serializer(page, many=True)
    #     #     serializer = PropSearchSerializer(page, many=True)
    #     #     # print(2)
    #     #     result_data = serializer.data

 
    #     #     return self.get_paginated_response(result_data)


    #     print('no pag')
    #     # serializer = self.get_serializer(queryset, many=True)
    #     # serializer = UserPropSerializer(queryset1, many=True)
    #     return Response(queryset1)
    #     # return self.get_paginated_response(serializer.data)

    # def get(self, request):
    #     return self.list(request)
