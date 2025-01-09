@echo off
cls

echo Build start,kill MarkText and Delete build...
call k.bat >nul
rmdir /s /q build

echo Clean cache...
rmdir /s /q node_modules\.cache 2>nul
rmdir /s /q .cache 2>nul

echo Setting language to zh-cn...
set lang=zh-cn

echo Installing dependencies...
call yarn install --ignore-scripts --ignore-engines --production=false
if errorlevel 1 (
    echo Yarn install completed with warnings, continuing...
)

echo Copy node_modules to app
call xcopy_.bat >nul
if errorlevel 1 (
    echo Copy node_modules to app, continuing...
)

echo yarn run pack...
call yarn run pack
if errorlevel 1 (
    echo Pack completed with warnings, continuing...
)

echo yarn electron-builder --dir...
call yarn electron-builder --dir
if errorlevel 1 (
    echo Electron-builder completed with warnings, continuing...
)


echo Copy translate-resources files
xcopy /E /I /Y "M:\cm\ydm\translate-resources" "build\win-unpacked\translate-resources"

echo Build process completed!
pause
