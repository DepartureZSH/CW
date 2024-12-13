# Quick Start

Step1: Download and unpacking this project.

Step2: Create a python environment and install the required packages.

```python
pip install -r requirements.txt
```

Step3: Run the project by the command

```python
python manage.py runserver 8000
```

Step4: Open your brower and go to "http://127.0.0.1:8000/".

Step5: Authenticate your identity.

Accounts for test:

- Student:

  - Email: Student1@nottingham.edu.cn
  - Password: #Student1

- Teacher
  - Email: Teacher@nottingham.edu.cn
  - Password: #Teacher123456

- Admin
  - Email: Admin@nottingha.edu.cn
  - Password: #Admin123456
  
# Files structure

```cmd
- CMS
    - apps
        - AuthenticationCenter // Application: AuthenticationCenter
            - migrations
                ...
                (history of migrations)
            __init__.py
            admin.py // register models to admin site
            apps.py
            models.py // ORM models
            serializers.py // Validator and JSON formater
            tests.py
            urls.py // Router for this application
            views.py // Handlers for web requests 
        - CourseCenter
            ...
        - MyModules
            ...
        - MyProfile
            ...
    - CMS
        __init__.py
        asgi.py
        settings.py // Project's configerations
        urls.py // Router for this project
        wsgi.py
    - static
        - CSS
            Homepage.css
            ...
        - images
            uon-logo.png
            ...
        - js
            Login.js
            ...
    - templates
        - AuthenticationCenter
            index.html
            ...
        - HomePage
            index.html
            ...
        - TeacherPages
            Course.html
            ...
        404.html
    db.sqlite3
    manage.py
    readme.md
    requirements.txt
```

# Routers Structure

CMS.urls
```python
    ...
    # All http://127.0.0.1:8000/ will redirect to Router AuthenticationCenter.urls
    path('', include('AuthenticationCenter.urls')),
    # All http://127.0.0.1:8000/homepage/ will redirect to Router CourseCenter.urls
    path('homepage/', include('CourseCenter.urls')),
    # All http://127.0.0.1:8000/mymodules/ will redirect to Router MyModules.urls
    path('mymodules/', include('MyModules.urls')),
    # All http://127.0.0.1:8000/profile/ will redirect to Router MyProfile.urls
    path('profile/', include('MyProfile.urls')),
    # All http://127.0.0.1:8000/api-token-auth/ will redirect to obtain_auth_token, 
    # which is a build-in method that can obtain user token
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    # All http://127.0.0.1:8000/admin/ will redirect to Router admin.site.urls
    url(r'^admin/', admin.site.urls)
    ...
```
AuthenticationCenter.urls

```python
    ...
    # All http://127.0.0.1:8000/ will redirect to APIView class AuthenticationPage
    path('', views.AuthenticationPage.as_view(), name='Auth'),
    # All http://127.0.0.1:8000/Login/ will redirect to APIView class AuthenticationPage
    path('Login/', views.AuthenticationPage.as_view(), name='Auth'),
    # All http://127.0.0.1:8000/Register/ will redirect to APIView class RegisterPage
    path('Register/', views.RegisterPage.as_view(), name='Register'),
    # All http://127.0.0.1:8000/ForgetPassword/ will redirect to APIView class ForgetPassword
    path('ForgetPassword/', views.ForgetPasswordPage.as_view(), name='ForgetPassword')
    ...
```

CourseCenter.urls

```python
    ...
    # All http://127.0.0.1:8000/homepage/ will redirect to APIView class HomePage
    path('', views.HomePage.as_view(), name='home'),
    # All http://127.0.0.1:8000/homepage/api/getcourses will redirect to APIView class getCourses
    path('api/getcourses', views.getCourses.as_view(), name='allCourse'),
    # All http://127.0.0.1:8000/homepage/CourseDetails will redirect to APIView class CourseDetails
    path(r'CourseDetails', views.CourseDetails.as_view(), name='coursedetails'),
    # All http://127.0.0.1:8000/homepage/api/star will redirect to APIView class CourseStar
    path('api/star', views.CourseStar.as_view(), name='star'),
    # All http://127.0.0.1:8000/homepage/api/enroll will redirect to APIView class CourseEnroll
    path('api/enroll', views.CourseEnroll.as_view(), name='enroll'),
    # All http://127.0.0.1:8000/homepage/api/getcoursesbymcode will redirect to APIView class CourseDetails
    path('api/getcoursesbymcode', views.CourseDetails.as_view(), name='getcoursesbymcode'),
    ...
```
    
MyModules.urls

```python
    ...
    # All http://127.0.0.1:8000/mymodules/ will redirect to APIView class HomePage
    path('', views.HomePage.as_view(), name='home'),
    # All http://127.0.0.1:8000/mymodules/CourseDetails will redirect to APIView class CourseDetails
    path(r'CourseDetails', views.CourseDetails.as_view(), name='coursedetails'),
    # All http://127.0.0.1:8000/mymodules/MyCourseDetails will redirect to APIView class MyCourseDetails
    path(r'MyCourseDetails', views.MyCourseDetails.as_view(), name='mycoursedetails'),
    # All http://127.0.0.1:8000/mymodules/editcourse will redirect to APIView class EditCourse
    path(r'editcourse', views.EditCourse.as_view(), name='editcourse'),
    # All http://127.0.0.1:8000/mymodules/StudentList will redirect to APIView class StudentList
    path(r'StudentList', views.StudentList.as_view(), name='studentlist'),
    # All http://127.0.0.1:8000/mymodules/addcourse will redirect to APIView class AddCourse
    path('addcourse', views.AddCourse.as_view(), name='addcourse'),
    # All http://127.0.0.1:8000/mymodules/api/Course will redirect to APIView class CourseAPI
    path('api/Course', views.CourseAPI.as_view(), name='CourseAPI'),
    # All http://127.0.0.1:8000/mymodules/api/getallstudents will redirect to APIView class GetAllStudents
    path('api/getallstudents', views.GetAllStudents.as_view(), name='getallstudents'),
    # All http://127.0.0.1:8000/mymodules/api/getallenrollstudents will redirect to APIView class GetAllEnrollStudents
    path('api/getallenrollstudents', views.GetAllEnrollStudents.as_view(), name='getallenrollstudents'),
    # All http://127.0.0.1:8000/mymodules/api/getenrollments will redirect to APIView class getEnrollments
    path('api/getenrollments', views.getEnrollments.as_view(), name='allEnrollments'),
    # All http://127.0.0.1:8000/mymodules/api/getstars will redirect to APIView class getStars
    path('api/getstars', views.getStars.as_view(), name='allStars'),
    # All http://127.0.0.1:8000/mymodules/api/enroll will redirect to APIView class CourseEnroll
    path('api/enroll', views.CourseEnroll.as_view(), name='enroll'),
    # All http://127.0.0.1:8000/mymodules/api/getLectures will redirect to APIView class getLectures
    path('api/getLectures', views.getLectures.as_view(), name='allLectures'),
    ...
```

MyProfile.urls

```python
    ...
    # All http://127.0.0.1:8000/profile/ will redirect to APIView class HomePage
    path('', views.HomePage.as_view(), name='home'),
    # All http://127.0.0.1:8000/profile/api/getStudentInfo will redirect to APIView class StudentInfo
    path('api/getStudentInfo', views.StudentInfo.as_view(), name='getStudentInfo'),
    # All http://127.0.0.1:8000/profile/api/getTeacherInfo will redirect to APIView class TeacherInfo
    path('api/getTeacherInfo', views.TeacherInfo.as_view(), name='getTeacherInfo'),
    # All http://127.0.0.1:8000/profile/api/QA will redirect to APIView class QA
    path(r'api/QA', views.QA.as_view(), name='QA'),
    # All http://127.0.0.1:8000/profile/api/modifyStudentInfo will redirect to APIView class StudentInfoModify
    path('api/modifyStudentInfo', views.StudentInfoModify.as_view(), name='modifyStudentInfo')
    ...
```