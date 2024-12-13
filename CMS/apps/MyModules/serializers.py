try:
    from CourseCenter.models import *
    from AuthenticationCenter.models import *
except:
    from ..CourseCenter.models import *
    from ..AuthenticationCenter.models import *
from rest_framework import serializers

class EnrollmentSerializerD0(serializers.ModelSerializer):
    def validate(self, data):
        # check if there is a same enrollment already
        if Enrollment.objects.filter(sID=data['sID'], cID=data['cID']):
            raise serializers.ValidationError({'error': 'Enrollment already exists.'})
        return data

    class Meta:
        model = Enrollment
        fields = '__all__'

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

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'