from .models import *
import rest_framework.exceptions
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView
from rest_framework import status

from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import *

class AuthenticationPage(APIView):
    def get(self, request):
        # redirect to AuthenticationCenter/index.html
        return render(request, 'AuthenticationCenter/index.html')

    def post(self, request):
        # authenticate and login in the system
        try:
            # check if the user exists
            user = User.objects.get(email=request.data['email'])
            if user is not None:
                res = {
                    "msg": 'Incorrect username or password'
                }
                if user.is_admin:
                    # check if the user info is correct
                    user = authenticate(request, email=request.data['email'], password=request.data['password'])
                    # create a token
                    token, created = Token.objects.get_or_create(user=user)
                    if user is not None:
                        login(request, user)
                        res = {
                            "msg": 'success',
                            "id": user.get_id(),
                            'username': user.get_short_name(),
                            'role': "admin",
                            'token': token.key
                        }
                elif user.is_teacher:
                    user = authenticate(request, email=request.data['email'], password=request.data['password'])
                    token, created = Token.objects.get_or_create(user=user)
                    if user is not None:
                        login(request, user)
                        res = {
                            "msg": 'success',
                            "id": user.get_id(),
                            'username': user.get_short_name(),
                            'role': "teacher",
                            'token': token.key
                        }
                else:
                    user = authenticate(request, email=request.data['email'], password=request.data['password'])
                    token, created = Token.objects.get_or_create(user=user)
                    if user is not None:
                        login(request, user)
                        res = {
                            "msg": 'success',
                            "id": user.get_id(),
                            'username': user.get_short_name(),
                            'role': "student",
                            'token': token.key
                        }
                return Response(data=res, status=status.HTTP_200_OK)
        except:
            return Response(data={"msg": 'Incorrect username or password'}, status=status.HTTP_400_BAD_REQUEST)

class RegisterPage(APIView):

    def get(self, request):
        # redirect to AuthenticationCenter/RegisterPage.html
        return render(request, 'AuthenticationCenter/RegisterPage.html')

    def post(self, request):
        # Create a user with a certain role
        if request.data["role"] == "student":
            serializer = StudentSerializer(data=request.data)
        elif request.data["role"] == "teacher":
            serializer = TeacherSerializer(data=request.data)
        else:
            serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={"msg": 'success'}, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)