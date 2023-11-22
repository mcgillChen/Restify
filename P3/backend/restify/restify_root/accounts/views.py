# from .forms import RegistrationForm, LoginForm, ProfileEditForm
from .models import *
from django.contrib.auth.models import User


# Rest_API
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveUpdateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from .serializers import *
from rest_framework import status
from django.contrib.auth.password_validation import validate_password

from rest_framework.parsers import MultiPartParser, FormParser

import logging
logger = logging.Logger('django')


@api_view(['GET'])
def users_list(request):
    users = User.objects.all()
    return Response([{
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'phone_number': user.profile.phone_number,

    } for user in users])

# User registration


class CreateUserView(CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]


# User's profile detail view
class UserProfileView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):  # user can only see their own profile
        return User.objects.filter(id=self.request.user.id)


class EditUserProfileView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserUpdateSerializer

    def get_queryset(self):
        # TODO: change status code to UNAUTHENTICATED instead of 400?
        return User.objects.filter(id=self.request.user.id)

class userIcon(RetrieveUpdateDestroyAPIView):
    serializer_class = UserIconSerializer
    # queryset = Profile.objects.all()
    # queryset = PropImage.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    pk_url_kwarg = 'pk'
    def get_queryset(self):
        uid = self.kwargs.get(self.pk_url_kwarg)
        user = User.objects.get(id=uid)
        result = Profile.objects.get(user=user)

        return result
    



# ===========================================================================================
# class RegisterView(CreateView):
#     form_class = RegistrationForm
#     template_name = 'accounts/signup.html'
#     success_url = '/accounts/login/'

#     def form_valid(self, form):
#         self.request.session['from'] = 'signup'
#         return super().form_valid(form)


# class LoginView(FormView):
#     form_class = LoginForm
#     template_name = 'accounts/login.html'
#     success_url = '/accounts/profile/'

#     def form_valid(self, form):
#         login(self.request, form.cleaned_data['user'])
#         return super().form_valid(form)


# def logoutView(request):
#     logout(request)
#     request.session['from'] = 'logout'
#     return redirect('accounts:login')


# # @login_required
# def profile(request):
#     # the profile page that displays the user's profile data
#     user = request.user
#     context = {'user': user}
#     return render(request, 'accounts/profile.html', context)


# # @login_required JSON VERSION
# def profileView(request):
#     user = request.user
#     # if not request.user.is_authenticated:
#     #     return HttpResponse('UNAUTHORIZED', status=401)

#     context = {
#         'id': user.id,
#         'username': user.username,
#         'email': user.email,
#         'first_name': user.first_name,
#         'last_name': user.last_name,

#     }
#     return JsonResponse(context)
