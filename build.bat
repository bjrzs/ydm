@echo off
call k.bat >nul

cls

@echo off
echo.
echo.
color 0e

echo.
echo  __                       ___       __                       __
echo /\^ \       __  __   __   /\_^ \     /\^ \    __      ___      / __`\ 
echo \ \ \____ /\ \/\ \ /\_\  \//\ \    \_\^ \  /\_\  /'  _ `\   /\ \_\ \
echo  \ \  ,. \\ \ \_\ \\/\^ \   \_\ \_ /\ ,. \ \/\^ \ \ \ \/\ \  \ \____ \
echo   \ \____/ \ \____/ \ \^ \  /\____\\ \____\ \ \^ \ \ \_\ \_\  \/___/\^ \
echo    \/___/   \/___/   \/_/  \/____/ \/___^ /  \/_/  \/_/\/_/   /\___/ /
echo                                                              \_____/

echo.
echo                                 __  __     __                          __
echo   ___ ___       __      _ __   /\ \/  \   /\ \__     ___      __  _   /\ \__
echo  /' __` _`\   /'__`\   /\` __\ \ \  _ /   \ ,_ _\  / ,__`\   /\ \/'\  \ ,_ _\
echo /\ \/\ \/\ \ /\ \_\.\_ \ \ \/   \ \   ＼   \ \ \/  \  ___/_  \/^^\/ /_  \ \ \/
echo \ \_\ \_\ \_\\ \__/.\_\ \ \_\    \ \_\\_＼  \ \ \_  \ \____\   /\_/\_\  \ \ \_
echo  \/_/\/_/\/_/ \/__/\/_/  \/_/     \/_//__/   \ \__\  \/____/   \//\/_/   \ \__\
echo                                               \/__/                       \/__/
echo.
echo.
echo building main process


echo.
echo.
echo Format vue and js ,check Files...
echo.
call f.bat >nul
if errorlevel 1 (
    echo Find Error , Stop...    
    exit /b 1
)

echo Is OK,Let's continue...
echo.

echo ---Delete build
rmdir /s /q dist\electron
rmdir /s /q build


echo.
echo ---Clean node_modules.\cache
rmdir /s /q node_modules\.cache 2>nul
rmdir /s /q .cache 2>nul

rem echo Setting language to zh-cn...
rem set lang=zh-cn

echo.
echo ---Installing dependencies
rem --ignore-scripts --ignore-engines --production=false
call yarn install
if errorlevel 1 (
    echo Yarn install completed with warnings, continuing...
)

rem echo.
rem echo ---Copy node_modules to app
rem call xcopy_.bat >nul
rem if errorlevel 1 (
rem     echo Copy node_modules to app, continuing...
rem )

echo.
echo ---yarn run pack
call yarn run pack
if errorlevel 1 (
    echo Pack completed with warnings, continuing...
)

echo.
echo ---yarn electron-builder --dir
call yarn electron-builder --dir
if errorlevel 1 (
    echo Electron-builder completed with warnings, continuing...
)

echo ---Delete dist\electron 
rmdir /s /q dist\electron

echo.
echo ---Build process completed!

echo.
echo.
