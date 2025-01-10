@echo off

echo Processing: src\renderer\prefComponents\markdown\index.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\markdown\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\markdown\index.vue' -NoNewline"
pause

echo Processing: src\renderer\prefComponents\editor\index.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\editor\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\editor\index.vue' -NoNewline"
pause

echo Processing: src\renderer\prefComponents\spellcheck\index.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\spellcheck\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\spellcheck\index.vue' -NoNewline"
pause

echo Processing: src\renderer\prefComponents\search\index.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\search\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\search\index.vue' -NoNewline"
pause

echo Processing: src\renderer\prefComponents\image\index.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\image\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\image\index.vue' -NoNewline"
pause

echo Processing: src\renderer\prefComponents\keybindings\index.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\keybindings\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\keybindings\index.vue' -NoNewline"
pause

echo Processing: src\renderer\prefComponents\image-hosting\index.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\image-hosting\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\image-hosting\index.vue' -NoNewline"
pause

echo Processing: src\renderer\prefComponents\theme\index.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\theme\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\theme\index.vue' -NoNewline"
pause

echo Processing: src\renderer\prefComponents\about\index.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\about\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\about\index.vue' -NoNewline"
pause

echo Processing: src\renderer\prefComponents\preference.vue
powershell -Command "(Get-Content 'src\renderer\prefComponents\preference.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\preference.vue' -NoNewline"
pause

echo Processing: src\renderer\components\editor.vue
powershell -Command "(Get-Content 'src\renderer\components\editor.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\components\editor.vue' -NoNewline"
pause

echo Processing: src\main\preference.js
powershell -Command "(Get-Content 'src\main\preference.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\preference.js' -NoNewline"
pause

echo Processing: src\main\window.js
powershell -Command "(Get-Content 'src\main\window.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\window.js' -NoNewline"
pause

echo Processing: config.js
powershell -Command "(Get-Content 'config.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'config.js' -NoNewline"
pause

echo All files have been formatted!
pause 
