
# 快速上手
前置要求：
- Windows10（运行bat）
- python3（python3.6.8测试成功）

项目中应包含以下文件

```text
your project----------------------------------------------------
   | Backup----------------------------------------------------------
   |   | Mysql-------------------------------------------------------
   |   |   | __init__.py # 用于替代使用Mysql的api的__init__.py文件
   |   |   | settings.txt # 用于作为创建后api的settings.txt文件配置提示
   |   | Mongodb------------------------------------------------------
   |   |   | # 同上，暂空候补
   | Gadgets----------------------------------------------------------
   |   |   Create_Mysql_App.bat # 用于创建项目或创建某项目的使用Mysql的app
   |   |   Create_Superuser.bat # 用于项目创建一个超级管理员
   |   |   CreateorStart_Front_end.bat # 用于创建或启动前端项目
   |   |   front-end.png # 前端项目创建提示示例
   |   |   Migrate.bat # 用于项目数据迁移
   |   |   Start_Server.bat # 用于启动后端项目
   |   |   Tips.txt # 相关错误tips
   | Install_Packages.bat # 用于检测虚拟环境和下载requirements.txt所提供的包
   | npm_init.bat # 用于检测和配置npm、Vue环境
   | readme.txt # 项目指南
   | requirements.txt # 项目所需python包
   | Tips.txt # 相关错误tips
```

# 1.0.0 第一次配置项目环境
- step1 运行Install_Packages.bat
- step2 运行npm_init.bat

# 1.1.0 创建后端项目或app
- step1 运行Gadgets目录下的Create_Mysql_App.bat
- step2 修改项目名/项目名路径下的settings.py文件

- settings.py需要修改的内容：
    ```python
    ...
    import sys
    import os
    ...
    # Build paths inside the project like this: BASE_DIR / 'subdir'.
    BASE_DIR = Path(__file__).resolve().parent.parent
    # 将 项目名/apps/ 文件夹纳入sys.path目录
    # 可以将新创建的app移入此文件夹，方便管理
    sys.path.insert(0, os.path.join(BASE_DIR, 'apps')) 
    ...
    ALLOWED_HOSTS = ['*'] # 允许其他来源的访问
    ...
    INSTALLED_APPS = [
        ...
        # 新加的app
        '{your_app_name}',
    ]
    ...
    MIDDLEWARE = [
        ...
        # 新加的中间件
        'your middleware path',
    ]
    ...
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',  # 换成mysql或其他
            'NAME': 'your database name',  # 数据库名称
            'USER': 'user name',  # 数据库用户名
            'PASSWORD': 'user password',  # 数据库密码
            'HOST': '127.0.0.1', # Host地址
            'PORT': 3306, # 端口
            'OPTIONS': {
                'autocommit': True, # 自动提交
            },
        }
    }
    ...
    
    LANGUAGE_CODE = 'zh-hans'
    
    TIME_ZONE = 'Asia/Shanghai'
    
    ...
    USE_TZ = False
    ...
    
    ```

## 1.1.1 创建后端app后步骤
- step1 将该 app文件夹 整体移入 项目名/apps/ 文件夹中，若没有则创建后移入
- step2 修改 项目名/项目名 路径下的 settings.py，需要修改的内容如下：
    ```python
    ...
    INSTALLED_APPS = [
        ...
        # 新加的app
        '{your_app_name}',
    ]
    ...
    MIDDLEWARE = [
        ...
        # 新加的中间件
        'your middleware path',
    ]
    ```
- step2 修改 项目名/项目名 路径下的 urls.py ，需要修改的内容如下：
    ```python
    ...
    from django.urls import include, path, re_path
    urlpatterns = [
        ...
        ###################################################################################
        # {your_app_name} api
        # 将 {your web prefix}/api/{your_app_name}/ 的所有请求打给{your_app_name}.urls
        path('api/{your_app_name}/', include('{your_app_name}.urls')),
        ###################################################################################
        ...
    ]
    ```
- step3 在 项目名/apps/{your_app_name}/ 文件夹中添加 urls.py文件如下：
    ```python
    # urls.py in app
    from django.urls import path
    from . import views
    
    urlpatterns = [
        # 将 {your web prefix}/api/{your_app_name}/ 的所有请求打给views.{views_class_name_1}
        path('', views.{views_class_name_1}.as_view(), name='neckname1'),
        # 将 {your web prefix}/api/{your_app_name}/{int num}/ 的所有请求打给views.{views_class_name_2}
        # 并附上参数 int pk = num
        path(r'<int:pk>/', views.{views_class_name_2}.as_view(), name='neckname2'),
    ]
    ```

- step4 在 项目名/apps/{your_app_name}/ 文件夹中修改 views.py文件如下：
    ```python
    from .models import Project
    from rest_framework import viewsets
    from .serializers import ProjectSerializer
    from rest_framework.response import Response
    from rest_framework import status
    
    from rest_framework.views import APIView
    from rest_framework.response import Response
    from rest_framework import status
    
    
    class {views_class_name_1}(APIView):
        # 定义 GET 请求的方法，内部实现相同 @api_view
        def get(self, request):
            ############################################
            # 业务逻辑
            ############################################
            return Response({返回参数})
    
        # 定义 POST 请求的方法
        def post(self, request):
            ############################################
            # 业务逻辑
            ############################################
            return Response({返回参数})
    
    class {views_class_name_2}(APIView):
    
        def get(self, request, pk):
            ############################################
            # 业务逻辑
            ############################################
            return Response({返回参数})
    
        def put(self, request, pk):
            ############################################
            # 业务逻辑
            ############################################
            return Response({返回参数})
    
        # # to permit delete action or not
        # def delete(self, request, pk):
        #     ############################################
        #     # 业务逻辑
        #     ############################################
        #     return Response({返回参数})
    ```

# 创建前端项目
step1 运行Gadgets目录下的CreateorStart_Front_end.bat

# 数据迁移
step1 确保settings.py和相关数据文件配置无误，以及在数据库建立相关表
step2 运行Gadgets目录下的Migrate.bat

# 启动项目
step1 运行Gadgets目录下的Start_Server.bat
step2 运行Gadgets目录下的CreateorStart_Front_end.bat

# axios组件
vue->(axios)->restful api->django->vue->web
vue所需包：
axios：npm install --save axios@1.5.0

创建新API流程
step1 启动