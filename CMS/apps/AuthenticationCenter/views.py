# from .models import Project
from rest_framework import viewsets
# from .serializers import ProjectSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework import status

from django.shortcuts import render
from rest_framework.response import Response

class AuthenticationCenter(APIView):
    # 定义 GET 请求的方法，内部实现相同 @api_view
    def get(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return render(request, 'AuthenticationCenter/index.html')

    # 定义 GET 请求的方法，内部实现相同 @api_view
    # def get(self, request):
    #     ############################################
    #     # 业务逻辑
    #     ############################################
    #     return Response({返回参数})

    # 定义 POST 请求的方法
    def post(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return Response({返回参数})
