from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from django.urls import path

urlpatterns = [
    #! gives you the token
    path('login/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #! lets you refresh the token, extend the duration of the token
    #! use postman to see
    path('login/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
]
