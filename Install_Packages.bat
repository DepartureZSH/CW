

@echo off

cd %~dp0\

setlocal

rem 尝试运行Python 3并检查其版本
python --version > nul 2>&1
if %errorlevel% equ 0 (
    echo Python 3 is installed and the version is:
    python --version
) else (
    echo Python 3 is not installed or not properly configured in the system PATH.
    echo Please install Python 3 and ensure it is added to the PATH.
    set /p tmp=Press any key to exit...
)

endlocal

setlocal
rem 检测虚拟环境
echo ===============================
echo Checking venv...
if exist %~dp0\venv (
    echo venv already exists
) else (
	echo Not find venv
	echo Try creating venv...
	virtualenv venv
)
endlocal

call %~dp0\venv\Scripts\activate venv

rem pip updating...
echo pip updating...
pip list
pause
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
python -m pip install --upgrade pip

rem requirements downloading...
echo requirements downloading...
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
if %errorlevel% equ 0 (
    echo requirements.txt is successfully installed
) else (
    echo Requirements downloading unsuccessful! Please follow the tips.txt and restart this file later...
    start "" "Tips.txt"
)

set /p tmp=All successfully done. Press any key to exit...
