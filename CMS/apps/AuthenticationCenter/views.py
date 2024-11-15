# from .models import Project
import rest_framework.exceptions
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
        if request.data["role"] == "student":
            serializer = StudentSerializer(data=request.data)
        elif request.data["role"] == "teacher":
            serializer = TeacherSerializer(data=request.data)
        else:
            serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("Ok", serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            for key, value in serializer.errors.items():
                print(key, "\t", value[0])
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
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