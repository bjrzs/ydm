@echo off

echo Processing: src\main\i18n.js
powershell -NoProfile -Command "Set-Content -Path 'src\main\i18n.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\preference.js' -NoNewline"

echo Processing: src\renderer\prefComponents\markdown\index.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\markdown\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\markdown\index.vue' -NoNewline"

echo Processing: src\renderer\prefComponents\editor\index.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\editor\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\editor\index.vue' -NoNewline"

echo Processing: src\renderer\prefComponents\spellcheck\index.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\spellcheck\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\spellcheck\index.vue' -NoNewline"

echo Processing: src\renderer\prefComponents\search\index.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\search\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\search\index.vue' -NoNewline"

echo Processing: src\renderer\prefComponents\image\index.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\image\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\image\index.vue' -NoNewline"

echo Processing: src\renderer\prefComponents\keybindings\index.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\keybindings\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\keybindings\index.vue' -NoNewline"

echo Processing: src\renderer\prefComponents\image-hosting\index.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\image-hosting\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\image-hosting\index.vue' -NoNewline"

echo Processing: src\renderer\prefComponents\theme\index.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\theme\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\theme\index.vue' -NoNewline"

echo Processing: src\renderer\prefComponents\about\index.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\about\index.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\about\index.vue' -NoNewline"

echo Processing: src\renderer\prefComponents\preference.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\prefComponents\preference.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\prefComponents\preference.vue' -NoNewline"

echo Processing: src\renderer\components\editor.vue
powershell -NoProfile -Command "(Get-Content 'src\renderer\components\editor.vue' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\renderer\components\editor.vue' -NoNewline"

echo Processing: src\main\preference.js
powershell -NoProfile -Command "(Get-Content 'src\main\preference.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\preference.js' -NoNewline"

echo Processing: src\main\window.js
powershell -NoProfile -Command "(Get-Content 'src\main\window.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'src\main\window.js' -NoNewline"

echo Processing: config.js
powershell -NoProfile -Command "(Get-Content 'config.js' -Raw).TrimEnd() + [Environment]::NewLine | Set-Content 'config.js' -NoNewline"

echo All files have been formatted!
 
