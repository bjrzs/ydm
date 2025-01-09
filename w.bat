@echo off
echo Comparing directories...
echo Comparing M:\marktext\resources\app with M:\mt\build\win-unpacked\resources\app > app_error.txt
echo. >> app_error.txt
echo Files and directories that exist in M:\marktext\resources\app but not in M:\mt\build\win-unpacked\resources\app: >> app_error.txt
echo. >> app_error.txt

dir /b /s /a "M:\marktext\resources\app\node_modules" > temp1.txt
dir /b /s /a "M:\mt\build\win-unpacked\resources\app\node_modules" > temp2.txt

for /f "delims=" %%i in ('fc /n temp1.txt temp2.txt ^| findstr /i /c:"M:\\marktext"') do (
    set "line=%%i"
    setlocal enabledelayedexpansion
    set "line=!line:M:\marktext\resources\app=!"
    echo !line! >> app_error.txt
    endlocal
)

del temp1.txt
del temp2.txt

echo Comparison completed. Results saved to app_error.txt
pause 
