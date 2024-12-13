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
from django.shortcuts import render, redirect


class HomePage(APIView):
    def get(self, request):
        # redirect to HomePage/Profile.html
        return render(request, 'HomePage/Profile.html')

class QA(APIView):
    def get(self, request):
        # redirect to HomePage/QA{id}.html
        id = request.GET.get('id', None)
        if id and id < '3':
            return render(request, f'HomePage/QA{id}.html')
        else:
            return render(request, f'404.html')

class StudentInfo(APIView):
    def post(self, request):
        # retrieve students data with certain username
        student = Student.objects.get(username=request.data['username'])
        serializer = StudentSerializer(student)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TeacherInfo(APIView):
    def post(self, request):
        # retrieve teachers data with certain username
        teacher = Teacher.objects.get(username=request.data['username'])
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StudentInfoModify(APIView):
    def post(self, request):
        # update student information
        student = Student.objects.get(username=request.data['username'])
        if student:
            if request.data['Gender']:
                student.gender = request.data['Gender']
            if request.data['Telephone']:
                student.telephone = request.data['Telephone']
            student.save()
            serializer = StudentSerializer(student)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return render(request, f'404.html')
