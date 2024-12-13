try:
    from AuthenticationCenter.models import *
except:
    from ..AuthenticationCenter.models import *
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
        # retrieve all courses
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # retrieve courses with certain conditions
        courses = Course.objects.filter(**request.data)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CourseDetails(APIView):
    def get(self, request):
        # redirect to HomePage/CourseDetails.html
        return render(request, 'HomePage/CourseDetails.html')

    def post(self, request):
        # retrieve course details with certain mCode
        courses = Course.objects.filter(mCode=request.data["mCode"])
        serializer = CourseSerializerD1(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CourseStar(APIView):

    def post(self, request):
        # Create stars with certain student id
        sID = Student.objects.get(id=request.data['sID']).sID
        serializer = StarSerializer(data={'sID': sID, 'cID':request.data['cID']})
        if serializer.is_valid():
            serializer.save()
            return Response(data={"msg": 'Successfully starred!'}, status=status.HTTP_201_CREATED)
        else:
            if serializer.errors.get('error',0):
                Star.objects.get(sID=sID, cID=request.data['cID']).delete()
                return Response(data={"msg": 'Successfully unstarred!'}, status=status.HTTP_201_CREATED)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # return Response(serializer.data, status=status.HTTP_200_OK)

class CourseEnroll(APIView):

    def post(self, request):
        # Create enrollment with certain student id
        sID = Student.objects.get(id=request.data['sID']).sID
        serializer = EnrollmentSerializer(data={'sID': sID, 'cID':request.data['cID']})
        if serializer.is_valid():
            serializer.save()
            return Response(data={"msg": 'Successfully enrollment!'}, status=status.HTTP_201_CREATED)
        else:
            # to do
            # 判断是否已经star，是则删除已有star，否则报错
            if serializer.errors.get('error',0):
                # 保证不删除外键对应student和course
                Enrollment.objects.get(sID=sID, cID=request.data['cID']).delete()
                return Response(data={"msg": 'Successfully unenrollment!'}, status=status.HTTP_201_CREATED)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
