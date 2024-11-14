# from .models import Project
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework import status

from django.shortcuts import render
from rest_framework.response import Response
from .serializers import *

class AuthenticationPage(APIView):
    # 定义 GET 请求的方法，内部实现相同 @api_view
    def get(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return render(request, 'AuthenticationCenter/index.html')

    # 定义 POST 请求的方法
    def post(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return Response(request.data, status=status.HTTP_200_OK)

class RegisterPage(APIView):
    # 定义 GET 请求的方法，内部实现相同 @api_view
    def get(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return render(request, 'AuthenticationCenter/RegisterPage.html')

    # 定义 POST 请求的方法
    def post(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return Response(request.data, status=status.HTTP_200_OK)

class ForgetPasswordPage(APIView):
    # 定义 GET 请求的方法，内部实现相同 @api_view
    def get(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return render(request, 'AuthenticationCenter/ForgetPasswordPage.html')


    # 定义 POST 请求的方法
    def post(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return Response(request.data, status=status.HTTP_200_OK)