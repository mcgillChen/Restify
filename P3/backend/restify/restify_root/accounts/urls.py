from django.urls import path
from . import views


# add routes for all the pages in accounts.app
# 'accounts:<name>'
app_name = "accounts"

urlpatterns = [
    path('users-list/', views.users_list, name='users_list'),
    path('view-user-profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('edit-user-profile/<str:pk>/', views.EditUserProfileView.as_view(),
         name='edit_user_profile'),
    path('create-user/', views.CreateUserView.as_view(), name='create_user'),

    path('<int:pk>/icon/', views.userIcon.as_view(), name='updateicon'),



    # TODO: Implement Login, LoginRefresh, Logout
    # TODO: chenage token/ to login probably
    # path('login/', views.LoginView.as_view(), name="login"),
    # path('logout/', views.logoutView, name="logout"),
]
