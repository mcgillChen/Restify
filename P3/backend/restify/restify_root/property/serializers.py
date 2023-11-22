from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import PropData

# from .models import PropRentMode
from .models import Amenity
from .models import PropQuery
# from .models import PropImage
from .models import ActiveProp
from .models import PropImage


import logging
logger = logging.getLogger('django')

# class PropImageSerializer(ModelSerializer):
#     class Meta:
#         model = PropImage
#         exclude = ['owner']
        

class PropCreateSerializer(ModelSerializer):

    # prop_image = PropImageSerializer()

    class Meta:
        model = PropData
        # fields = ('title','description','type','owner','amenity_id','location','structure','PropRentModeData')
        exclude = ['owner']
        # fields = '__all__'

    def create(self, validated_data):
        # for stuff in validated_data:
        #     logger.info(f"key: {stuff} to: {validated_data[stuff]}")

        owner = self.context.get('request', None)
        if not owner:
            raise serializers.ValidationError({"error": "user info error"})
        owner = owner.user

        validated_data['owner'] = owner
        propdata = PropData.objects.create(**validated_data)

        return propdata

   
    def validate(self, data):
        
        user = self.context.get("request", None)
        if not user:
            raise serializers.ValidationError({"error": "user must be logged in"})

        # print(Amenity.objects.get(id=1))
        if 'amenity_id' in data:
            a_ids = data["amenity_id"].split(",")
            if "" in a_ids and len(a_ids > 1):
                raise serializers.ValidationError({"error": "amenity_id input format error"})

            # print(a_ids), 1 for no amenity, otherwise goes with regular
            for aid in a_ids:
                if int(aid) == 1:
                    data['amenity_id'] = "1"
                    break
                try:
                    Amenity.objects.get(id=int(aid))
                except(Exception):
                    raise serializers.ValidationError({"error": f"amenity id {aid} not exist"})
        

        # method =  self.context.get('request').method == "PUT"
        
        # if method == "PUT":
        if not 'structure' in data:
            raise serializers.ValidationError(
                {"error": "must included this in the form of string with 3 numbers seperated by comma, indicationg total beds, rooms, washrooms"})

        if not 'avaliable_structure' in data:
            raise serializers.ValidationError(
                {"error": "must included this in the form of string with 3 numbers seperated by comma, indicationg avaliable beds, rooms, washrooms"})

        if not "total_guests" in data or not "avaliable_guests" in data:
            # print(data)
            raise serializers.ValidationError({"error": "total_guests/avalibale_guests field is required"})

        if not "price" in data:
            raise serializers.ValidationError({"error": "price field is required"})

        if int(data["total_guests"]) < 0 or int(data["avaliable_guests"]) < 0:
            raise serializers.ValidationError({"erorr": "total_guests/avalibale_guests fields must be natural number"})

        if int(data["price"]) < 0 :
            raise serializers.ValidationError({"error": "price field must be natural number"})

        # print("hahha")

        total_struct = data['structure'].split(',')
        avaliable_struct = data['avaliable_structure'].split(',')
        for i in range(3):
            if int(total_struct[i]) < int(avaliable_struct[i]):
                raise serializers.ValidationError({"error":"avaliable structure must not exceed total structure"})
        if int(data["total_guests"]) < int(data["avaliable_guests"]):
            raise serializers.ValidationError({"error":"avaliable guest must not exceed total guest"})
        return data


class PropUpdateSerializer(ModelSerializer):
    class Meta:
        model = PropData
        fields = ['title', 'description', 'type', 'amenity_id',
                  'structure', 'rent_type', 'avaliable_structure', 'price',
                  'total_guests', 'avaliable_guests']
        read_only_fields = [('id')]
        

    def validate(self, data):

        user = self.context.get("request", None)
        if not user:
            raise serializers.ValidationError(
                {"user": "user must be logged in"})

        # print(Amenity.objects.get(id=1))
        if 'amenity_id' in data:
            a_ids = data["amenity_id"].split(",")
            if "" in a_ids:
                raise serializers.ValidationError(
                    {"amenity_id": "input format error"})

            # print(a_ids)
            for aid in a_ids:
                try:
                    Amenity.objects.get(id=int(aid))
                except(Exception):
                    raise serializers.ValidationError({"amenity_id": f"amenity id {aid} not exist"})
        
        # method =  self.context.get('request').method == "PUT"
        
        # if method == "PUT":
        if not 'structure' in data:
            raise serializers.ValidationError(
                {"structure": "must included this in the form of string with 3 numbers seperated by comma, indicationg total beds, rooms, washrooms"})

        if not 'avaliable_structure' in data:
            raise serializers.ValidationError(
                {"avaliable_structure": "must included this in the form of string with 3 numbers seperated by comma, indicationg avaliable beds, rooms, washrooms"})

        if not "total_guests" in data or not "avaliable_guests" in data:
            # print(data)
            raise serializers.ValidationError({"total_guests/avalibale_guests": "this field is required"})

        if not "price" in data:
            raise serializers.ValidationError({"price": "this field is required"})

        if int(data["total_guests"]) < 0 or int(data["avaliable_guests"]) < 0:
            raise serializers.ValidationError(
                {"total_guests/avalibale_guests": "this field must be natural number"})

        if int(data["price"]) < 0:
            raise serializers.ValidationError(
                {"price": "this field must be natural number"})

        # print("hahha")

        total_struct = data['structure'].split(',')
        avaliable_struct = data['avaliable_structure'].split(',')
        for i in range(3):
            if int(total_struct[i]) < int(avaliable_struct[i]):
                raise serializers.ValidationError(
                    {"structure/avaliable_sturecture": "avaliable item must not exceed total item"})
        if int(data["total_guests"]) < int(data["avaliable_guests"]):
            raise serializers.ValidationError(
                {"total_guests/avaliable_guests": "avaliable guest must not exceed total guest"})
        return data


class PropSearchSerializer(ModelSerializer):
    # pid = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = PropData
        # fields=['title','description','type', 'amenity_id', 'structure', 'rent_type', 'avaliable_structure', 'price', 'guest']
        # exclude = ['owner']
        fields = "__all__"


class PropQuerySerializer(ModelSerializer):

    class Meta:
        model = PropQuery
        # fields= '__all__'
        exclude = ['rent_type', 'prop_type',
                   'start_date', 'end_date', 'distance']

    def validate(self, data):

        logger.info("\nvalidate stuff here________")
        logger.info(data)
        logger.info("validate stuff end________\n")

        # if 'start_date' in data and 'end_date' in data and and data['start_date'] != None and data['end_datedata['start_date'] < data['end_date']:
        #     raise serializers.ValidationError("start day must not exceed end day")


        if 'start_price' in data and 'max_price' in data and data['start_price'] != None and \
            data['max_price'] != None and int(data['max_price']) < int(data['start_price']):
            raise serializers.ValidationError("start price must not exceed max price")

        # if 'structure' in data and :

        #     total_struct = data['structure'].split(',')
        # avaliable_struct = data['avaliable_structure'].split(',')
        # for i in range(3):
        #     if int(total_struct[i]) < int(avaliable_struct[i]):
        #         raise serializers.ValidationError("avaliable item must not exceed total item")
        # if int(data["total_guests"]) < int(data["avaliable_guests"]):
        #     raise serializers.ValidationError("avaliable guest must not exceed total guest")
        return data

class AmenitySerializer(ModelSerializer):
    class Meta:
        model = Amenity
        fields = "__all__"

class ActivatePropSerializer(ModelSerializer):
    class Meta:
        model = ActiveProp
        fields = "__all__"

class UserPropSerializer(ModelSerializer):

    
    class Meta:
        model = PropData
        fields = "__all__"
    
class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=['id','username']

class PropImageSerializer(ModelSerializer):
    
    # pid= serializers.ReadOnlyField(source='creator.username')
    # pid = serializers.ReadOnlyField(source='creator.id')
    upload = serializers.ImageField(required=False)

    class Meta:
        model = PropImage
        # exclude=['owner']
        fields='__all__'

    # def validate(self, data):

    #     logger.info("\nvalidate stuff here________")
    #     logger.info(data)
    #     uid = data['prop_id']
    #     try:
    #         PropData.object.get(owner=uid)
    #         print("user found")
    #     except:
    #         raise serializers.ValidationError("user is not found")
    #     logger.info("validate stuff end________\n")
    #     return data
