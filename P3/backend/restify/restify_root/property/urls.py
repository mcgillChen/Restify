from django.urls import path
from . import views
from .views import createprop,  editprop, searchprop, getAmenity, ActiveateProp, userProp, priceProp, ppUpdate
from .views import propOwner, retrieveImage, updateImages
# add routes for all the pages in accounts.app
# 'accounts:<name>'
app_name = "property"

urlpatterns = [
    path('create/', createprop.as_view(), name='create'),
    path('<int:pk>/edit/', editprop.as_view(), name='edit'),
    path('search/', searchprop.as_view(), name='search'),
    path('amenity/', getAmenity.as_view(), name='amenity'),
    path('activate/', ActiveateProp.as_view(), name='activate'),
    # path('user-prop/', userprop.as_view(), name='user-prop'),
    
    # pk must be user id
    path('<int:pk>/user-prop/', userProp.as_view(), name='user-prop'),
    
    # pk must be pid
    path('<int:pk>/time/', priceProp.as_view(), name='propactivetime'),
    
    # pk must be activate id
    path('<int:pk>/update/', ppUpdate.as_view(), name='propactiveedit'),

    # path('<int:pk>/update/', ppUpdate.as_view(), name='propactiveedit'),

    # pk must be user id aka prop.owner
    path('<int:pk>/owner/', propOwner.as_view(), name='propowner'),

    path('image/', retrieveImage.as_view(), name='propimage'),

    path('<int:pk>/image/', updateImages.as_view(), name='updateimage'),
    # path('image/', updateImages.as_view(), name='updateimage')


    # path('<int:pk>/edit/', editprop.as_view(), name='edit'),
] 

