@echo off

cd %~dp0..
set MAINPATH=%cd%
set /p PROJECTNAME=please enter the project name:

rem 检测虚拟环境
echo ===============================
echo Checking venv...
if exist %MAINPATH%\venv (
	call %MAINPATH%\venv\Scripts\activate.bat
	cd %MAINPATH%\%PROJECTNAME%
	python manage.py createsuperuser
) else (
	echo Not find venv
	set /p tmp=Press any key to exit...
)