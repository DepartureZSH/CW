try:
    from CourseCenter.models import *
    from AuthenticationCenter.models import *
except:
    from ..CourseCenter.models import *
    from ..AuthenticationCenter.models import *
from rest_framework import serializers

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'
        depth = 1

class StarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Star
        fields = '__all__'
        depth = 1

class CourseSerializerD1(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        depth = 1