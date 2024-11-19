# urls.py in app
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # 将 {your web prefix}/api/{your_app_name}/ 的所有请求打给views.{views_class_name_1}
    path('', views.HomePage.as_view(), name='home'),
    path('api/getcourses', views.getCourses.as_view(), name='allCourse'),
    path(r'CourseDetails', views.CourseDetails.as_view(), name='coursedetails'),
    path('api/getcoursesbymcode', views.CourseDetails.as_view(), name='getcoursesbymcode'),
    # 将 {your web prefix}/api/{your_app_name}/{int num}/ 的所有请求打给views.{views_class_name_2}
    # 并附上参数 int pk = num
    # path(r'<int:pk>/', views.{views_class_name_2}.as_view(), name='neckname2'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)