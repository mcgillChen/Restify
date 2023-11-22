from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

# from django.views.generic import CreateAPIView

from rest_framework import generics
# from ..serializers import UserSerializer, GroupSerializer, PropCreateSerializer
from ..serializers import PropCreateSerializer, PropUpdateSerializer

from ..models import PropData, Amenity


class editprop(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated]
    queryset = PropData.objects.all()
    serializer_class = PropUpdateSerializer

    pk_url_kwarg = 'pk'
    # lookup_field = 'prop_id'

    def get_queryset(self):
        pid = self.kwargs.get(self.pk_url_kwarg)
        return PropData.objects.filter(id = pid)
    
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        
        pid = self.kwargs.get(self.pk_url_kwarg)
        prop = PropData.objects.get(id=pid)
        if prop.owner != request.user:
            print("bad user input")
            return Response(data={"user error": "No permission to edit file"}, status=403)
        else:
            print("good user input")
        
        return self.update(request, *args, **kwargs)
    
    def patch(self, request, *args, **kwargs):
        
        pid = self.kwargs.get(self.pk_url_kwarg)
        prop = PropData.objects.get(id=pid)
        if prop.owner != request.user:
            print("bad user input")
            return Response(data={"user error": "No permission to edit file"}, status=403)
        else:
            print("good user input")
        
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):

        pid = self.kwargs.get(self.pk_url_kwarg)
        prop = PropData.objects.get(id=pid)
        if prop.owner != request.user:
            print("bad user input")
            return Response(data={"user error": "No permission to delete file"}, status=403)
        else:
            print("good user input")

        return self.destroy(request, *args, **kwargs)
    
    # def __init__(self, **kwargs) -> None:
        
    #     super().__init__(**kwargs)

        # self.propid = kwargs.get('pk')
        # print(self.propid)

    
        

        