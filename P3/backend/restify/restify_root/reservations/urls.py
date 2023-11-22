from django.urls import path
from . import views

app_name = "reservations"
urlpatterns = [
    path('list/', views.reservation_list, name='reservation_list'),
    #! all reservations of user unfiltered
    path('reservations-details-all/',
         views.UserReservationView.as_view(), name='reservation-details-all'),
    #!filter reservations by usertype and status
    path('reservations-details-all/filter/',
         views.UserReservationFilterView.as_view(), name='reservation-details-all-filter'),
    path('reservations-details/<str:pk>/',
         views.UserReservationDetailView.as_view(), name='reservation-details'),
    path('create-reservation/',
         views.CreateReservationView.as_view(), name='create_reservation'),
    path('update-reservation/<str:pk>/', views.UpdateReservationView.as_view(),
         name='update_reseration'),
    path('host-update-reservation/<str:pk>/', views.HostUpdateReservationView.as_view(),
         name='host_update_reseration'),
    path('guest-update-reservation/<str:pk>/', views.GuestUpdateReservationView.as_view(),
         name='guest_update_reseration'),
]
