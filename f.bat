@echo off
echo Format vue and js...

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


yarn eslint --fix src\main\menu\templates\*.js src\main\keyboard\*.js src\main\preferences\*.js src\renderer\i18n\*.js

pause
 
