from .models import *
from rest_framework import serializers
import re

class StudentSerializer(serializers.ModelSerializer):
    school = serializers.CharField(max_length=255)
    campus = serializers.CharField(max_length=40)
    faculty = serializers.CharField(max_length=255)

    def validate_email(self, email):
        if Student.objects.filter(email=email).exists():
            raise serializers.ValidationError("This username is already taken.")
        return email

    def create(self, validated_data):
        campus_dict = {
            "UNNC": "Ningbo China",
            "UNUK": "Nottingham UK",
            "UNMC": "Malaysia Campus"
        }
        faculty_dict = {
            "CELE": "CELE",
            "FOSE": "Science and Engineering",
            "FHSS": "Humanities and Social Sciences"
        }
        department = Department.objects.get(
            School=validated_data['school'],
            Campus=campus_dict[validated_data['campus']],
            Faculty=faculty_dict[validated_data['faculty']]
        )
        validated_data.pop('school', None)
        validated_data.pop('campus', None)
        validated_data.pop('faculty', None)
        if department is None:
            raise serializers.ValidationError("没有找到匹配的dID")

        instance = Student.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            dID=department,
            is_user=True
        )
        return instance

    class Meta:
        model = Student
        fields = ["username", "email", "password", "school", "campus", "faculty"]

class TeacherSerializer(serializers.ModelSerializer):
    school = serializers.CharField(max_length=255)
    campus = serializers.CharField(max_length=40)
    faculty = serializers.CharField(max_length=255)

    def validate_email(self, email):
        if Teacher.objects.filter(email=email).exists():
            raise serializers.ValidationError("This username is already taken.")
        return email

    def create(self, validated_data):
        campus_dict = {
            "UNNC": "Ningbo China",
            "UNUK": "Nottingham UK",
            "UNMC": "Malaysia Campus"
        }
        faculty_dict = {
            "CELE": "CELE",
            "FOSE": "Science and Engineering",
            "FHSS": "Humanities and Social Sciences"
        }
        department = Department.objects.get(
            School=validated_data['school'],
            Campus=campus_dict[validated_data['campus']],
            Faculty=faculty_dict[validated_data['faculty']]
        )
        validated_data.pop('school', None)
        validated_data.pop('campus', None)
        validated_data.pop('faculty', None)
        if department is None:
            raise serializers.ValidationError("没有找到匹配的dID")

        instance = Teacher.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            dID=department,
            is_user=True,
            is_teacher=True
        )
        return instance

    class Meta:
        model = Teacher
        fields = ["username", "email", "password", "school", "campus", "faculty"]

class AdminSerializer(serializers.ModelSerializer):
    school = serializers.CharField(max_length=255)
    campus = serializers.CharField(max_length=40)
    faculty = serializers.CharField(max_length=255)

    def validate_email(self, email):
        if Admin.objects.filter(email=email).exists():
            raise serializers.ValidationError("This username is already taken.")
        return email

    def create(self, validated_data):
        campus_dict = {
            "UNNC": "Ningbo China",
            "UNUK": "Nottingham UK",
            "UNMC": "Malaysia Campus"
        }
        faculty_dict = {
            "CELE": "CELE",
            "FOSE": "Science and Engineering",
            "FHSS": "Humanities and Social Sciences"
        }
        department = Department.objects.get(
            School=validated_data['school'],
            Campus=campus_dict[validated_data['campus']],
            Faculty=faculty_dict[validated_data['faculty']]
        )
        validated_data.pop('school', None)
        validated_data.pop('campus', None)
        validated_data.pop('faculty', None)
        if department is None:
            raise serializers.ValidationError("没有找到匹配的dID")

        instance = Admin.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            dID=department,
            is_user=True,
            is_teacher=True,
            is_admin=True
        )
        return instance

    class Meta:
        model = Admin
        fields = ["username", "email", "password", "school", "campus", "faculty"]
