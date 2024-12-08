try:
    from AuthenticationCenter.models import *
    from AuthenticationCenter.serializers import StudentSerializer
except:
    from ..AuthenticationCenter.serializers import StudentSerializer
    from ..AuthenticationCenter.models import *
from .serializers import *
from .models import *
import rest_framework.exceptions
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from rest_framework.views import APIView
from django.shortcuts import render

class HomePage(APIView):
    # 定义 GET 请求的方法，内部实现相同 @api_view
    def get(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return render(request, 'HomePage/Profile.html')

class StudentInfo(APIView):
    def post(self, request):
        student = Student.objects.get(username=request.data['username'])
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=status.HTTP_200_OK)
