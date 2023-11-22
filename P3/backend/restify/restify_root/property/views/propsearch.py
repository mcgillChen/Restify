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

class searchprop(ListCreateAPIView):

    # permission_classes = [IsAuthenticated]

    queryset = PropData.objects.all()
    serializer_class = PropQuerySerializer
    pagination_class = PageNumberPagination
    # _paginator = PageNumberPagination

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """

        # if

        data = self.request.data
        if data == {}:
            return PropData.objects.all()

        # logger.info(f"{i}: {data[i]}")

        if "pid" in data:
            try:
                print(1)
                # return 1
                return {PropData.objects.get(id=int(data["pid"]))}
            except:
                return None
            
        for i in data:
            logger.info(f"{i}: {data[i]}")

        # logger.info(1)

        fields = ['str_q','amenity_id','location','num_beds','num_rooms','num_washrooms',
                  'start_price','max_price','guest','sort_by']
        
        for item in fields:
            if item not in data:
                return f'input data must contain field:{item}'
        # values = {}
        # for field in fields:
        #     if field in data:
        #         values[field] = data[field]
        #     else:

        str_q = data['str_q']
        amenity_ids = data['amenity_id']
        slocation = data['location']
        # distance = data['distance']

        # date_start = data['start_date']
        # date_end = data['end_date']

        num_beds = data['num_beds']
        num_rooms = data['num_rooms']
        num_washrooms = data['num_washrooms']

        # rent_type = data['rent_type']
        # prop_type = data['prop_type']

        start_price = data['start_price']
        end_price = data['max_price']

        guests_num = data['guest']

        sort_by = data['sort_by']

        query = PropData.objects.all()

        structs = []

        # extract PropData items with string representation list items
        if (amenity_ids != None or amenity_ids != "") and (num_beds != None or num_beds != ''
                                                           or num_beds != -1) and (num_rooms != None or num_rooms != "" or num_rooms != -1) \
                and (num_washrooms != None or num_washrooms != "" or num_washrooms != -1):

            # logger.info(f"______: {query}")
            for item in query:
                strc = item.avaliable_structure.split(',')
                strc.append(item.id)
                strc.append(item.amenity_id.split(','))
                structs.append(strc)

            # logger.info(f"____: {structs}")

        if str_q != "" and str_q != None:
            query = query.filter(Q(title__icontains=str_q)
                                 | Q(description__icontains=str_q))

        if amenity_ids:
            ids = []
            search_amenities = amenity_ids.split(',')
            # logger.info(f"____search_amenities: {search_amenities}")

            for item in structs:
                a = True
                for search_id in search_amenities:
                    if search_id not in item[4]:
                        a = False
                        break
                if a:
                    ids.append(item[3])

            query = query.filter(id__in=ids)

        if slocation != "" and slocation != None:
            query = query.filter(location=slocation)

        # if distance:

        # if date_start, filter all with that date or after that date
        # if date_start:
        #   query = query.objects.filter..

        # if date_end, filter all with that date or before that day
        # if date_end
        #   query = ..

        if num_beds != None and num_beds != "" and num_beds != -1:
            # query = query.filter(avaliable_structure__gte=num_beds)
            pk1 = []
            for item in structs:
                if int(item[0]) >= int(num_beds):
                    pk1.append(item[3])
            query = query.filter(id__in=pk1)

        if num_rooms != None and num_rooms != "" and num_rooms != -1:
            # query = query.filter(avaliable_structure__gte=num_rooms)
            pk2 = []
            for item in structs:
                if int(item[1]) >= int(num_rooms):
                    pk2.append(item[3])
            query = query.filter(id__in=pk2)

        if num_washrooms != None and num_washrooms != "" and num_washrooms != -1:
            # query = query.filter(avaliable_structure__gte=num_washrooms)
            pk3 = []
            for item in structs:
                if int(item[2]) >= int(num_washrooms):
                    pk3.append(item[3])
            query = query.filter(id__in=pk3)

        if start_price != '' and start_price != -1 and start_price != None:
            query = query.filter(price__gte=start_price)

        if end_price != '' and end_price != -1 and end_price != None:
            query = query.filter(price__lt=end_price)

        if guests_num != "" and guests_num != None and guests_num:
            query = query.filter(avaliable_guests__gte=guests_num)

        if sort_by != None and sort_by != "" and sort_by != "None":
            query = query.order_by(sort_by)

        if query != None and query != "" and query != {}:
            return query
        else:
            return PropData.objects.all()

    # def get_paginated_response(self, data):
    #     """
    #     Return a paginated style `Response` object for the given output data.
    #     """
    #     print(1)
    #     assert self.paginator is not None
    #     print(data)
    #     return self.paginator.get_paginated_response(data)

    def list(self, request, *args, **kwargs):
        queryset1 = self.filter_queryset(self.get_queryset())
        request1 = request
        # print(type(queryset1))
        if type(queryset1) is str:
            return Response(data={'missin field':f"{queryset1}"},status=400)

        print(self.paginator)
        # pagination = PageNumberPagination()
        # pagination.page_size=4
        # pagination.page_query_param = 'page'

        page = self.paginate_queryset(queryset1)
        print(page)
        if not page is None:
            print("yes pag")

            # serializer = self.get_serializer(page, many=True)
            serializer = PropSearchSerializer(page, many=True)
            # print(2)
            result_data = serializer.data

 
            return self.get_paginated_response(result_data)


        print('no pag')
        # serializer = self.get_serializer(queryset, many=True)
        serializer = PropSearchSerializer(queryset1, many=True)
        return Response(serializer.data)
        # return self.get_paginated_response(serializer.data)

    # def get(self, request):
    #     # serializer = PropQuerySerializer()
        
    #     return Response({})

    def post(self, request):
        # serializer = PropQuerySerializer
        # valid = serializer.validate(self,request.data)
        
        
        return self.list(request)
