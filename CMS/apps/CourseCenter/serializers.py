from .models import *
try:
    from AuthenticationCenter.models import *
except:
    from ..AuthenticationCenter.models import *
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

class EnrollmentSerializer(serializers.ModelSerializer):

    def validate(self, data):
        # check if there is a same enrollment already
        if Enrollment.objects.filter(sID=data['sID'], cID=data['cID']):
            raise serializers.ValidationError({'error': 'Enrollment already exists.'})
        return data

    class Meta:
        model = Enrollment
        fields = '__all__'

class StarSerializer(serializers.ModelSerializer):

    def validate(self, data):
        # check if there is a same star already
        if Star.objects.filter(sID=data['sID'], cID=data['cID']):
            raise serializers.ValidationError({'error': 'Star already exists.'})
        return data

    class Meta:
        model = Star
        fields = '__all__'
