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
    # 定义 GET 请求的方法，内部实现相同 @api_view
    def get(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return render(request, 'AuthenticationCenter/index.html')

    # 定义 POST 请求的方法
    def post(self, request):
        try:
            user = User.objects.get(email=request.data['email'])
            if user is not None:
                res = {
                    "msg": 'Incorrect username or password'
                }
                if user.is_admin:
                    user = authenticate(request, email=request.data['email'], password=request.data['password'])
                    token, created = Token.objects.get_or_create(user=user)
                    if user is not None:
                        login(request, user)
                        res = {
                            "msg": 'success',
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
                            'username': user.get_short_name(),
                            'role': "student",
                            'token': token.key
                        }
                return Response(data=res, status=status.HTTP_200_OK)
        except:
            return Response(data={"msg": 'Incorrect username or password'}, status=status.HTTP_400_BAD_REQUEST)
        # if request.data["role"] == "student":
        #     serializer = StudentSerializer(data=request.data)
        # elif request.data["role"] == "teacher":
        #     serializer = TeacherSerializer(data=request.data)
        # else:
        #     serializer = AdminSerializer(data=request.data)
        # if serializer.is_valid():
        #     # 保存序列化后的数据到student数据库
        #     serializer.save()
        #     return render(request, 'AuthenticationCenter/index.html')
        #     # return Response(status=status.HTTP_201_CREATED)
        # else:
        #     # data = ""
        #     # for key, value in serializer.errors.items():
        #     #     data += "{}: {}\n".format(key, value[0])
        #     # print(data)
        #     return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterPage(APIView):


    # 定义 GET 请求的方法，内部实现相同 @api_view
    def get(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return render(request, 'AuthenticationCenter/RegisterPage.html')

    # 定义 POST 请求的方法
    def post(self, request):
        MyUserManager = UserManager()
        if request.data["role"] == "student":
            serializer = StudentSerializer(data=request.data)
            if serializer.is_valid():
                # 保存序列化后的数据到student数据库
                # serializer.save()
                data = serializer.create(serializer.data)
                print(data)
                # MyUserManager.create_student(**serializer.data)
                # print(serializer.data)
        elif request.data["role"] == "teacher":
            serializer = TeacherSerializer(data=request.data)
        else:
            serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            # 保存序列化后的数据到student数据库
            # serializer.save()
            print(serializer.data)
            return Response(data={"msg": 'success'}, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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