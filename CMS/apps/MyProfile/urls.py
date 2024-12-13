from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # 将 {your web prefix}/api/{your_app_name}/ 的所有请求打给views.{views_class_name_1}
    path('', views.HomePage.as_view(), name='home'),
    path('api/getStudentInfo', views.StudentInfo.as_view(), name='getStudentInfo'),
    path('api/getTeacherInfo', views.TeacherInfo.as_view(), name='getTeacherInfo'),
    path(r'api/QA', views.QA.as_view(), name='QA'),
    path('api/modifyStudentInfo', views.StudentInfoModify.as_view(), name='modifyStudentInfo')
    # 将 {your web prefix}/api/{your_app_name}/{int num}/ 的所有请求打给views.{views_class_name_2}
    # 并附上参数 int pk = num
    # path(r'<int:pk>/', views.{views_class_name_2}.as_view(), name='neckname2'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)