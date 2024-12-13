from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.HomePage.as_view(), name='home'),
    path(r'CourseDetails', views.CourseDetails.as_view(), name='coursedetails'),
    path(r'MyCourseDetails', views.MyCourseDetails.as_view(), name='mycoursedetails'),
    path(r'editcourse', views.EditCourse.as_view(), name='editcourse'),
    path(r'StudentList', views.StudentList.as_view(), name='studentlist'),
    path('addcourse', views.AddCourse.as_view(), name='addcourse'),
    path('api/Course', views.CourseAPI.as_view(), name='CourseAPI'),
    path('api/getallstudents', views.GetAllStudents.as_view(), name='getallstudents'),
    path('api/getallenrollstudents', views.GetAllEnrollStudents.as_view(), name='getallenrollstudents'),
    path('api/getenrollments', views.getEnrollments.as_view(), name='allEnrollments'),
    path('api/getstars', views.getStars.as_view(), name='allStars'),
    path('api/enroll', views.CourseEnroll.as_view(), name='enroll'),
    path('api/getLectures', views.getLectures.as_view(), name='allLectures'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)