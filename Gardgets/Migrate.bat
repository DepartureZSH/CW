@echo off
cd %~dp0..
set MAINPATH=%cd%
set PROJECTNAME=CMS

rem 检测虚拟环境
echo ===============================
echo Starting migrate...
call %MAINPATH%\venv\Scripts\activate.bat
cd %MAINPATH%\%PROJECTNAME%
python manage.py makemigrations
python manage.py migrate

set /p tmp=Next step: run Start_Server.bat . Press any key to exit...