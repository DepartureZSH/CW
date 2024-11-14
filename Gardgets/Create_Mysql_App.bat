@echo off
cd %~dp0..
set MAINPATH=%cd%
set PROJECTNAME=CMS
set /p APPNAME=please enter the app name:

call %MAINPATH%\venv\Scripts\activate.bat

rem 初始化django项目
echo ===============================
echo init django project...
echo Finding %PROJECTNAME%...
if exist %MAINPATH%\%PROJECTNAME% (
	echo %PROJECTNAME% already exits...
) else (
	echo Not find %PROJECTNAME%
	echo Creating new %PROJECTNAME%...
	django-admin startproject %PROJECTNAME%
)

rem 创建app
echo ===============================
echo init django app...
cd %MAINPATH%\%PROJECTNAME%
echo Finding %PROJECTNAME%\%APPNAME%...
if exist %MAINPATH%\%PROJECTNAME%\%APPNAME% (
	echo %PROJECTNAME%\%APPNAME% project already exist...
) else (
	echo Creating new %MAINPATH%\%PROJECTNAME%\%APPNAME% project...
	python manage.py startapp %APPNAME%
	rem 修改配置文件
	echo copy init files...
	copy /y "%MAINPATH%\Backup\Mysql\__init__.py" "%MAINPATH%\%PROJECTNAME%\%PROJECTNAME%\__init__.py"
	start "" "%MAINPATH%\Backup\Mysql\settings.txt"
	rem copy /y "%MAINPATH%\Backup\Mysql\settings.py" "%MAINPATH%\%PROJECTNAME%\%PROJECTNAME%\settings.py"
)

set /p tmp=Next step: fill out your mysql informations in .\%PROJECTNAME%\%PROJECTNAME%\settings.py, then run Migrate.bat . Press any key to exit...