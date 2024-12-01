from AuthenticationCenter.models import *
from .models import *
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

class HomePage(APIView):
    # 定义 GET 请求的方法，内部实现相同 @api_view
    def get(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return render(request, 'HomePage/index.html')

class getCourses(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        # courses = Course.objects.filter(mCode__startswith=request.data["mCode"], academic_year__in=request.data["Year"], semester__in=request.data["Semester"], name__contains=request.data["name"])
        courses = Course.objects.filter(**request.data)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CourseDetails(APIView):
    def get(self, request):
        return render(request, 'HomePage/CourseDetails.html')

    def post(self, request):
        courses = Course.objects.filter(mCode=request.data["mCode"])
        serializer = CourseSerializerD1(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CourseStar(APIView):
    def get(self, request):
        print(request.data)
        # return render(request, 'HomePage/CourseDetails.html')

    def post(self, request):
        print(request.data)
        return Response("ok", status=status.HTTP_200_OK)

# Create your views here.
