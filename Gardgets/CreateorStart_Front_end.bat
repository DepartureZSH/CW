@echo off

cd %~dp0..
set MAINPATH=%cd%
set PROJECTNAME=EIdoEIdo_Front_End

rem change resource url of npm
call npm config set registry https://registry.npmmirror.com

rem 检测前端环境
echo ===============================
echo Checking front-end...
if exist %MAINPATH%\%PROJECTNAME% (
	cd %MAINPATH%\%PROJECTNAME%
	call npm run dev
	goto quit
) else (
	call vue init webpack %PROJECTNAME%
)

if exist %MAINPATH%\%PROJECTNAME% (
	cd %MAINPATH%\%PROJECTNAME%
	start "" "%~dp0\front-end.png"
	call npm run dev
	goto quit
) else (
	echo Please follow the feedback to fix the problem.
)

:quit
set /p tmp=Press any key to exit...
pause