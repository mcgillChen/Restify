from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
# from .branch import Branch
# from django.validators import validate_comma_separated_integer_list

from django.core.validators import validate_comma_separated_integer_list


class PropData(models.Model):

    title = models.CharField(max_length=256, help_text="perperty title")
    description = models.TextField(
        max_length=3000,  verbose_name="perperty description")
    type = models.CharField(max_length=32, choices=[('House', 'house'), ('Apartment', 'apartment'), ('Cabin', 'cabin'), ("Cave", 'cave'), ('Hotel', 'hotel')],
                            verbose_name="currently 5 types: 'house', 'apartment','cabin','cave','hotel")

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    amenity_id = models.CharField(max_length=289,
                                  validators=[RegexValidator(regex='^([0-9]+,)*[0-9]+$',
                                                             message='amenity id must be positive integers seperated by comma only',
                                                             code='invalid_amenity_id')],
                                  verbose_name="string of ammenty id, split by comma. i.e '11,2,93,4,' , '', '2',")

    location = models.CharField(max_length=1024, verbose_name="address")
    structure = models.CharField(max_length=40,
                                 validators=[RegexValidator(regex='^[0-9]+,[0-9]+,[0-9]+$',
                                                            message='struct must be 3 non-negative integers seperated by 1 comma only, indicationg total beds, rooms, washrooms',
                                                            code='invalid_structure')],
                                 verbose_name="string with 3 numbers seperated by comma, indicationg total [beds, rooms, washrooms] of the property. i.e [1,2,3] means the property has 1 bed, 2 rooms, and 3 toilets")

    rent_type = models.CharField(max_length=32, choices=[('Entire Place', 'entire_place'), ('Private Room', 'private_room'), ('Shared Room', 'shared_room'), ('Entire Floor', 'entire_floor')],
                                 verbose_name="currently 4 types: entire_place, private_room,shared_room, entire_floor")
    avaliable_structure = models.CharField(max_length=40,
                                           validators=[RegexValidator(regex='^[0-9]+,[0-9]+,[0-9]+$',
                                                                      message='struct must be 3 non-negative integers seperated by 1 comma only, indicationg avaliable beds, rooms, washrooms',
                                                                      code='invalid_avaliable_structure')],
                                           verbose_name="string with 3 numbers seperated by comma, indicationg avaliable [beds, rooms, washrooms] of the property. i.e [1,2,3] means the property has 1 bed, 2 rooms, and 3 toilets avaliable")
    price = models.PositiveIntegerField(
        verbose_name="price of the hourse per day")

    total_guests = models.PositiveSmallIntegerField(
        verbose_name="number of guests this property can support")
    avaliable_guests = models.PositiveSmallIntegerField(
        verbose_name="number of guests this property can add")

    # class Meta:
    # constraints = [
    #     models.CheckConstraint(check=models.Q(age__gte=18), name='age_gte_18'),
    # ]

    # type cast of obj to str, return will be shown when print
    def __str__(self):
        return f"{self.title}"

# class PropImage(models.Model):
#     owner = models.ForeignKey(User, on_delete=models.CASCADE)
#     pid = models.ForeignKey(PropData, on_delete=models.CASCADE)
#     iid = models.CharField(max_length=100)

#     def __str__(self):
#         return f"{self.title}"


class PropQuery(models.Model):
    str_q = models.CharField(
        max_length=256, help_text="string you want to find", null=True, default=None)
    amenity_id = models.CharField(max_length=289, null=True, default=None,
                                  verbose_name="string of ammenty id, split by comma. i.e '11,2,93,4,' , '', '2',")
    location = models.CharField(
        max_length=1024, null=True, default=None, verbose_name="address of property you want")
    distance = models.PositiveSmallIntegerField(null=True, default=None)
    start_date = models.DateField(null=True, default=None)
    end_date = models.DateField(null=True, default=None)
    num_beds = models.PositiveSmallIntegerField(null=True, default=None)
    num_rooms = models.PositiveSmallIntegerField(null=True, default=None)
    num_washrooms = models.PositiveSmallIntegerField(null=True, default=None)
    rent_type = models.CharField(max_length=32, choices=[('Entire Place', 'entire_place'), ('Private Room', 'private_room'), ('Shared Room', 'shared_room'), ('Entire Floor', 'entire_floor')],
                                 verbose_name="currently 4 types: entire_place, private_room,shared_room, entire_floor", null=True, default=None)
    prop_type = models.CharField(max_length=32, choices=[('House', 'house'), ('Apartment', 'apartment'), ('Cabin', 'cabin'), ("Cave", 'cave'), ('Hotel', 'hotel')],
                                 verbose_name="currently 5 types: 'house', 'apartment','cabin','cave','hotel", null=True, default=None)
    start_price = models.PositiveIntegerField(
        verbose_name="min price you want", null=True, default=None)
    max_price = models.PositiveIntegerField(
        verbose_name="max price", null=True, default=None)
    guest = models.PositiveSmallIntegerField(
        verbose_name="guests can fit", null=True, default=None)

#     sort_by = models.CharField(max_length=32, choices=[('price','price'),("avaliable_guests","number of guests avaliable"), ("rent_type", "property type")],\
    sort_by = models.CharField(max_length=32, choices=[('price', 'price'), ("avaliable_guests", "number of guests avaliable")],
                               verbose_name="currently 2 sory type: price, number of beds", null=True, default=None)

    def __str__(self):
        return f"id: {self.id}\n\
                sortby: {self.sort_by}\n\
                Query\ntitle: {self.str_q}\n\
                amenity_id: {self.amenity_id}\n\
                location: {self.location}\n\
                distance: {self.distance}\n\
                start_date: {self.start_date} to  {self.end_date}\n\
                num_bed: {self.num_beds}\n\
                num_room: {self.num_rooms}\n\
                num_washroom: {self.num_washrooms}\n\
                rent_type: {self.rent_type}\n\
                prop_type: {self.prop_type}\n\
                start_price: {self.start_price}\n\
                max_price: {self.max_price}\n\
                guest: {self.guest}\n"


class Amenity(models.Model):

    amenity_name = models.CharField(max_length=64)

    def __str__(self):
        return f"id: {self.id}\t{self.amenity_name}"


class ActiveProp(models.Model):
    pid = models.ForeignKey(PropData, on_delete=models.CASCADE)
    # date = models.DateField(unique=True)
    date = models.DateField()

    price = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(1000000)])

    class Meta:
        unique_together = ("pid", "date")

    def __str__(self):
        return f'id: {self.id}\ndate: {self.date}\npid: {self.pid}\nprice: {self.price}'

# def user_directory_path(instance, filename):

#     # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
#     return 'user_{0}/{1}'.format(instance.user.id, filename)

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class PropImage(models.Model):

    pid = models.ForeignKey(PropData,on_delete=models.CASCADE)
    # owner = models.ForeignKey(User,on_delete=models.CASCADE)
    upload = models.ImageField(upload_to=upload_to)
