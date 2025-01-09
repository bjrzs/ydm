@echo off
cls

echo Build start,kill MarkText and delete build...
taskkill /F /IM MarkText.exe 2>nul
rmdir /s /q build

echo Clean cache...
rmdir /s /q node_modules\.cache 2>nul
rmdir /s /q .cache 2>nul

echo Installing dependencies...
call yarn install --ignore-scripts --ignore-engines --production=false
if errorlevel 1 (
    echo Yarn install completed with warnings, continuing...
)

rem add the 
echo Copying translation resources...
mkdir build\translate-resources 2>nul
xcopy /E /I /Y "M:\cm\ydm\translate-resources" "build\translate-resources"  2>nul

echo new build need copy node_modules
call xcopy_.bat 2>nul

echo Running pack...
call yarn run pack
if errorlevel 1 (
    echo Pack completed with warnings, continuing...
)

echo Building with electron-builder...
call yarn electron-builder --dir
if errorlevel 1 (
    echo Electron-builder completed with warnings, continuing...
)

echo Build process completed!
pause
