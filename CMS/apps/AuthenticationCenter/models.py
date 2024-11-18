from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):

    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_user', True)
        return self._create_user(email, password, **extra_fields)

    def create_teacher(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_user', True)
        extra_fields.setdefault('is_teacher', True)
        if extra_fields.get('is_teacher') is not True:
            raise ValueError('Teacher must have is_teacher=True.')
        return self._create_user(email, password, **extra_fields)

    def create_administrators(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_user', True)
        extra_fields.setdefault('is_teacher', True)
        extra_fields.setdefault('is_admin', True)
        if extra_fields.get('is_admin') is not True:
            raise ValueError('Administrator must have is_admin=True.')
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_user', True)
        extra_fields.setdefault('is_teacher', True)
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True)
    is_user = models.BooleanField(default=True)
    is_teacher = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_short_name(self):
        return self.email.split("@")[0]

    def __str__(self):
        return self.email

class Department(models.Model):
    dID = models.AutoField(primary_key=True)
    School = models.CharField(max_length=255)
    Campus = models.CharField(max_length=40, blank=True)
    Faculty = models.CharField(max_length=255)

    def __str__(self):
        return "{}, {}, {}".format(self.Faculty,self.Campus,self.School)
    # def getID(self, school, campus, faculty):
    #     try:
    #         ID = self.objects.get(School=school, Campus=campus, Faculty=faculty).dID
    #     except:
    #         ID = None
    #     return ID

class Student(User):
    sID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    gender = models.CharField(max_length=1, blank=True)
    telephone = models.CharField(max_length=20, blank=True)
    dID = models.ForeignKey(Department, on_delete=models.CASCADE)

class Teacher(User):
    wID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    Title = models.CharField(max_length=40, blank=True)
    Telephone = models.CharField(max_length=20, blank=True)
    dID = models.ForeignKey(Department, on_delete=models.CASCADE)


class Admin(User):
    aID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    dID = models.ForeignKey(Department, on_delete=models.CASCADE)
