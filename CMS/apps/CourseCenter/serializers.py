from .models import *
from rest_framework import serializers

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseSerializerD1(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        depth = 1