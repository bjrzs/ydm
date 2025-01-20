@echo off
cls
chcp 65001


:: use ESLint to fix files
echo.
echo ---Use ESLint to fix files...
call yarn eslint --fix ^
src\main\index.js ^
src\main\menu\dynamicMenu.js ^
src\renderer\main.js ^
src\renderer\store\preferences.js ^
src\renderer\i18n\index.js ^
src\renderer\menu\config.js ^
src\main\menu\templates\file\index.js ^
src\renderer\app.vue ^
src\renderer\components\sideBar\help.js ^
src\renderer\components\sideBar\index.vue ^
src\renderer\components\sideBar\toc.vue ^
src\main\menu\templates\file.js ^
src\main\menu\templates\edit.js ^
src\main\menu\templates\view.js ^
src\main\menu\templates\window.js ^
src\main\menu\templates\help.js ^
src\main\menu\templates\format.js ^
src\main\menu\templates\theme.js ^
src\main\menu\templates\paragraph.js ^
src\main\menu\templates\marktext.js ^
src\main\menu\templates\dock.js ^
src\main\keyboard\shortcutHandler.js ^
src\main\preferences\index.js ^
src\renderer\menu\menuBuilder.js ^
src\renderer\menu\index.js
if errorlevel 1 (
    echo Use ESLint Error, Stop...
) else (
    echo Use ESLint ok.
)

:: use Prettier to format files
echo.
echo ---Use Prettier to format files...
call %Prettier_path%/prettier --write ^
src\main\index.js ^
src\main\menu\dynamicMenu.js ^
src\renderer\main.js ^
src\renderer\store\preferences.js ^
src\renderer\i18n\index.js ^
src\renderer\menu\config.js ^
src\main\menu\templates\file\index.js ^
src\renderer\app.vue ^
src\renderer\components\sideBar\help.js ^
src\renderer\components\sideBar\index.vue ^
src\renderer\components\sideBar\toc.vue ^
src\main\menu\templates\file.js ^
src\main\menu\templates\edit.js ^
src\main\menu\templates\view.js ^
src\main\menu\templates\window.js ^
src\main\menu\templates\help.js ^
src\main\menu\templates\format.js ^
src\main\menu\templates\theme.js ^
src\main\menu\templates\paragraph.js ^
src\main\menu\templates\marktext.js ^
src\main\menu\templates\dock.js ^
src\main\keyboard\shortcutHandler.js ^
src\main\preferences\index.js ^
src\renderer\menu\menuBuilder.js ^
src\renderer\menu\index.js ^
src\locales\zh-cn.json
if errorlevel 1 (
    echo Use Prettier Error, Stop...
) else (
    echo Use Prettier ok.
)

:: remove trailing whitespace and ensure LF line endings
echo.
echo ---Remove trailing whitespace and ensure LF line endings...
call sed -i 's/\s\+$//' ^
src\main\index.js ^
src\main\menu\dynamicMenu.js ^
src\renderer\main.js ^
src\renderer\store\preferences.js ^
src\renderer\i18n\index.js ^
src\renderer\menu\config.js ^
src\main\menu\templates\file\index.js ^
src\renderer\app.vue ^
src\renderer\components\sideBar\help.js ^
src\renderer\components\sideBar\index.vue ^
src\renderer\components\sideBar\toc.vue ^
src\main\menu\templates\file.js ^
src\main\menu\templates\edit.js ^
src\main\menu\templates\view.js ^
src\main\menu\templates\window.js ^
src\main\menu\templates\help.js ^
src\main\menu\templates\format.js ^
src\main\menu\templates\theme.js ^
src\main\menu\templates\paragraph.js ^
src\main\menu\templates\marktext.js ^
src\main\menu\templates\dock.js ^
src\main\keyboard\shortcutHandler.js ^
src\main\preferences\index.js ^
src\renderer\menu\menuBuilder.js ^
src\renderer\menu\index.js ^
src\locales\zh-cn.json
if errorlevel 1 (
    echo Remove trailing Error, Stop...
) else (
    echo Remove trailing whitespace ok.
)

:: convert CRLF to LF
echo.
echo ---Convert CRLF to LF...
call dos2unix ^
src\main\index.js ^
src\main\menu\dynamicMenu.js ^
src\renderer\main.js ^
src\renderer\store\preferences.js ^
src\renderer\i18n\index.js ^
src\renderer\menu\config.js ^
src\main\menu\templates\file\index.js ^
src\renderer\app.vue ^
src\renderer\components\sideBar\help.js ^
src\renderer\components\sideBar\index.vue ^
src\renderer\components\sideBar\toc.vue ^
src\main\menu\templates\file.js ^
src\main\menu\templates\edit.js ^
src\main\menu\templates\view.js ^
src\main\menu\templates\window.js ^
src\main\menu\templates\help.js ^
src\main\menu\templates\format.js ^
src\main\menu\templates\theme.js ^
src\main\menu\templates\paragraph.js ^
src\main\menu\templates\marktext.js ^
src\main\menu\templates\dock.js ^
src\main\keyboard\shortcutHandler.js ^
src\main\preferences\index.js ^
src\renderer\menu\menuBuilder.js ^
src\renderer\menu\index.js ^
src\locales\zh-cn.json
if errorlevel 1 (
    echo Convert CRLF to LF Error, Stop...
) else (
    echo Convert CRLF to LF ok.
)

:: finished
echo.
echo Is OK, Let's continue...


exit /b 0
