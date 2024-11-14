@echo off

rem 检测npm...
echo npm checking...

rem 尝试运行npm并检查其版本
echo npm checking...
call npm --version > nul 2>&1
if %errorlevel% equ 0 (
    echo npm is installed and the version is:
    call npm --version
) else (
    echo npm not found
    echo Please install npm and ensure it is added to the PATH.
    set /p tmp=Press any key to exit...
)

call cnpm --version >nul 2>&1
if %errorlevel% equ 0 (
	echo cnpm is installed.
) else (
	rem install cnpm
	call npm install cnpm -g --registry=https://registry.npmmirror.com
)

rem change resource url of npm
call npm config set registry https://registry.npmmirror.com

rem 尝试运行npm并检查其版本
call vue --version > nul 2>&1
if %errorlevel% equ 0 (
    echo vue-cli is installed and the version is:
    call vue --version
) else (
    echo vue-cli not found
    call npm install -g vue-cli
)

set /p tmp=Press any key to exit...
pause