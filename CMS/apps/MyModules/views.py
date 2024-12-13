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

class HomePage(APIView):
    def get(self, request):
        # redirect to HomePage/MyModules.html
        return render(request, 'HomePage/MyModules.html')

class MyCourseDetails(APIView):
    def get(self, request):
        # redirect to TeacherPages/CourseDetails.html
        return render(request, 'TeacherPages/CourseDetails.html')

class AddCourse(APIView):
    def get(self, request):
        # redirect to TeacherPages/Course.html
        return render(request, 'TeacherPages/Course.html')

class EditCourse(APIView):
    def get(self, request):
        # redirect to TeacherPages/Course.html
        return render(request, 'TeacherPages/Course.html')

class StudentList(APIView):
    def get(self, request):
        # redirect to TeacherPages/StudentList.html
        return render(request, 'TeacherPages/StudentList.html')

class CourseDetails(APIView):
    def get(self, request):
        # redirect to HomePage/CourseDetails.html
        return render(request, 'HomePage/CourseDetails.html')

    def post(self, request):
        # retrieve courses data with certain mCode
        courses = Course.objects.filter(mCode=request.data["mCode"])
        serializer = CourseSerializerD1(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class getEnrollments(APIView):
    def post(self, request):
        # retrieve all enrollments data
        if request.data['role'] == 'student':
            student = Student.objects.get(id=request.data['id'])
            enrollments = Enrollment.objects.filter(sID=student.sID)
            serializer = EnrollmentSerializer(enrollments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data={'msg':'You have no permission!'}, status=status.HTTP_200_OK)

class getStars(APIView):
    def post(self, request):
        # retrieve all stars data
        if request.data['role'] == 'student':
            student = Student.objects.get(id=request.data['id'])
            stars = Star.objects.filter(sID=student.sID)
            serializer = StarsSerializer(stars, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data={'msg':'You have no permission!'}, status=status.HTTP_200_OK)

class getLectures(APIView):
    def post(self, request):
        # retrieve courses data of certain teacher's
        if request.data['role'] == 'teacher':
            teacher = Teacher.objects.get(id=request.data['id'])
            courses = Course.objects.filter(wID=teacher.wID)
            serializer = CourseSerializerD1(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data={'msg': 'You have no permission!'}, status=status.HTTP_200_OK)

class CourseAPI(APIView):
    def post(self, request):
        # create a course
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={'msg':'Success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        # update course
        try:
            course = Course.objects.filter(mCode=request.data["mCode"])[0]
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data={'msg':'Success'}, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        # delete a course with certain mCode
        Course.objects.get(mCode=request.data["mCode"]).delete()
        return Response(data={'msg': 'Success'}, status=status.HTTP_200_OK)

class GetAllStudents(APIView):
    def get(self, request):
        # Get all students data
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetAllEnrollStudents(APIView):
    def post(self, request):
        # retrieve students data who enrolled in a certain course
        course = Course.objects.filter(mCode=request.data["mCode"])[0]
        enrollments = Enrollment.objects.filter(cID=course.cID)
        serializers = EnrollmentSerializer(enrollments, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

class CourseEnroll(APIView):
    def post(self, request):
        # create an enrollment for certain student on certain course
        sID = request.data['sID']
        cID = Course.objects.get(mCode=request.data['mCode']).cID
        serializer = EnrollmentSerializerD0(data={'sID': sID, 'cID':cID})
        if serializer.is_valid():
            serializer.save()
            return Response(data={"msg": 'Successfully enrollment!'}, status=status.HTTP_201_CREATED)
        else:
            if serializer.errors.get('error',0):
                Enrollment.objects.get(sID=sID, cID=cID).delete()
                return Response(data={"msg": 'Successfully unenrollment!'}, status=status.HTTP_201_CREATED)
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
