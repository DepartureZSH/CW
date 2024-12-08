try:
    from AuthenticationCenter.models import *
except:
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
from rest_framework.response import Response

class HomePage(APIView):
    # 定义 GET 请求的方法，内部实现相同 @api_view
    def get(self, request):
        ############################################
        # 业务逻辑
        ############################################
        return render(request, 'HomePage/MyModules.html')

class getEnrollments(APIView):
    def get(self, request):
        pass
    def post(self, request):
        if request.data['role'] == 'student':
            student = Student.objects.get(id=request.data['id'])
            enrollments = Enrollment.objects.filter(sID=student.sID)
            serializer = EnrollmentSerializer(enrollments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data={'msg':'Success'}, status=status.HTTP_200_OK)

class getStars(APIView):
    def get(self, request):
        pass
    def post(self, request):
        if request.data['role'] == 'student':
            student = Student.objects.get(id=request.data['id'])
            stars = Star.objects.filter(sID=student.sID)
            serializer = StarsSerializer(stars, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data={'msg':'Success'}, status=status.HTTP_200_OK)

class CourseDetails(APIView):
    def get(self, request):
        return render(request, 'HomePage/CourseDetails.html')

    def post(self, request):
        courses = Course.objects.filter(mCode=request.data["mCode"])
        serializer = CourseSerializerD1(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)