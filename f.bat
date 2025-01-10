@echo off
setlocal enabledelayedexpansion

REM Process specific Vue files
set "VUE_FILES=src\renderer\prefComponents\markdown\index.vue"
set "VUE_FILES=!VUE_FILES! src\renderer\prefComponents\editor\index.vue"
set "VUE_FILES=!VUE_FILES! src\renderer\prefComponents\spellcheck\index.vue"
set "VUE_FILES=!VUE_FILES! src\renderer\prefComponents\keybindings\index.vue"
set "VUE_FILES=!VUE_FILES! src\renderer\prefComponents\theme\index.vue"
set "VUE_FILES=!VUE_FILES! src\renderer\components\sideBar\index.vue"
set "VUE_FILES=!VUE_FILES! src\renderer\components\titleBar\index.vue"
set "VUE_FILES=!VUE_FILES! src\renderer\components\preferences\index.vue"
set "VUE_FILES=!VUE_FILES! src\renderer\components\editorWithTabs\index.vue"
set "VUE_FILES=!VUE_FILES! src\renderer\components\contextMenu\index.vue"

REM Process specific JS files
set "JS_FILES=src\main\menu\templates\edit.js"
set "JS_FILES=!JS_FILES! src\main\menu\templates\file.js"
set "JS_FILES=!JS_FILES! src\main\menu\templates\help.js"
set "JS_FILES=!JS_FILES! src\main\menu\templates\view.js"
set "JS_FILES=!JS_FILES! src\main\menu\templates\window.js"
set "JS_FILES=!JS_FILES! src\main\preferences\index.js"
set "JS_FILES=!JS_FILES! src\renderer\store\editor.js"
set "JS_FILES=!JS_FILES! src\renderer\store\preferences.js"
set "JS_FILES=!JS_FILES! src\renderer\util\keybindings.js"
set "JS_FILES=!JS_FILES! src\renderer\util\theme.js"
set "JS_FILES=!JS_FILES! src\renderer\i18n\index.js"
set "JS_FILES=!JS_FILES! src\renderer\i18n\config.js"
set "JS_FILES=!JS_FILES! src\main\config.js"

REM Format Vue files
for %%F in (%VUE_FILES%) do (
    if exist "%%F" (
        echo Processing Vue: %%F
        powershell -Command "(Get-Content '%%F' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content '%%F' -NoNewline"
    )
)

REM Format JS files
for %%F in (%JS_FILES%) do (
    if exist "%%F" (
        echo Processing JS: %%F
        powershell -Command "(Get-Content '%%F' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content '%%F' -NoNewline"
    )
)

echo.
echo Format completed!
pause 
