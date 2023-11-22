from django.contrib import admin
from .models import PropData, Amenity, PropQuery, ActiveProp, PropImage

# Register your models here.
admin.site.register(PropData)
# admin.site.register(PropRentMode)
admin.site.register(Amenity)
admin.site.register(PropQuery)
admin.site.register(ActiveProp)
admin.site.register(PropImage)

