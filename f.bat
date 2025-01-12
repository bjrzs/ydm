@echo off
echo Format vue and js...

:: Format existing files
powershell -NoProfile -Command "(Get-Content -Path 'src\renderer\i18n\index.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\i18n\index.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\file.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\file.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\edit.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\edit.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\view.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\view.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\window.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\window.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\help.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\help.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\format.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\format.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\paragraph.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\paragraph.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\theme.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\theme.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\marktext.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\marktext.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\templates\dock.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\templates\dock.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\keyboard\shortcutHandler.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\keyboard\shortcutHandler.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\preferences\index.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\preferences\index.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\renderer\main.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\main.js' -NoNewline"

:: Format new menu files
powershell -NoProfile -Command "(Get-Content -Path 'src\renderer\menu\config.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\menu\config.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\renderer\menu\menuBuilder.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\menu\menuBuilder.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\renderer\menu\index.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\menu\index.js' -NoNewline"

:: Format new main process files
powershell -NoProfile -Command "(Get-Content -Path 'src\main\menu\dynamicMenu.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\menu\dynamicMenu.js' -NoNewline"
powershell -NoProfile -Command "(Get-Content -Path 'src\main\index.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\index.js' -NoNewline"

:: Run ESLint
yarn eslint --fix src\main\menu\templates\*.js src\main\keyboard\*.js src\main\preferences\*.js src\renderer\i18n\*.js src\renderer\menu\*.js src\main\menu\dynamicMenu.js src\main\index.js src\renderer\main.js

:: Format with Prettier
prettier --write "src/renderer/menu/config.js"
prettier --write "src/renderer/menu/menuBuilder.js"
prettier --write "src/renderer/menu/index.js"
prettier --write "src/renderer/i18n/index.js"
prettier --write "src/main/menu/dynamicMenu.js"
prettier --write "src/main/index.js"
prettier --write "src/renderer/main.js"

:: Remove trailing spaces and ensure LF line endings
sed -i 's/\s\+$//' "src/renderer/menu/config.js"
sed -i 's/\s\+$//' "src/renderer/menu/menuBuilder.js"
sed -i 's/\s\+$//' "src/renderer/menu/index.js"
sed -i 's/\s\+$//' "src/renderer/i18n/index.js"
sed -i 's/\s\+$//' "src/main/menu/dynamicMenu.js"
sed -i 's/\s\+$//' "src/main/index.js"
sed -i 's/\s\+$//' "src/renderer/main.js"

:: Convert CRLF to LF
dos2unix "src/renderer/menu/config.js"
dos2unix "src/renderer/menu/menuBuilder.js"
dos2unix "src/renderer/menu/index.js"
dos2unix "src/renderer/i18n/index.js"
dos2unix "src/main/menu/dynamicMenu.js"
dos2unix "src/main/index.js"
dos2unix "src/renderer/main.js"

pause
 
