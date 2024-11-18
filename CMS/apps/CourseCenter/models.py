from django.db import models
from AuthenticationCenter.models import *

class Course(models.Model):
    cID = models.AutoField(primary_key=True)  # 自增主键
    name = models.CharField(max_length=255, null=False)
    academic_year = models.CharField(max_length=40)
    mCode = models.CharField(max_length=20)
    credits = models.IntegerField()
    level = models.IntegerField()
    semester = models.CharField(max_length=40)
    summary = models.TextField()
    aims = models.TextField()
    method_frequency = models.TextField()
    assessment = models.TextField()
    assessment_period = models.TextField()
    outcomes = models.TextField()
    dID = models.ForeignKey(Department, on_delete=models.CASCADE, null=False)  # 外键关联到部门
    wID = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=False)  # 外键关联到教职工

    def __str__(self):
        return self.name
# Create your models here.
