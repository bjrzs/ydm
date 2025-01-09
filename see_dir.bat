@echo off
echo ==================== > dir_all.txt
echo Root Directory: >> dir_all.txt
dir >> dir_all.txt
echo ==================== >> dir_all.txt

echo dist Directory: >> dir_all.txt
dir /s/a "dist" >> dir_all.txt
echo ==================== >> dir_all.txt

echo resources Directory: >> dir_all.txt
dir /s/a "resources" >> dir_all.txt
echo ==================== >> dir_all.txt

echo translate-resources Directory: >> dir_all.txt
dir /s/a "translate-resources" >> dir_all.txt
echo ==================== >> dir_all.txt

echo static Directory: >> dir_all.txt
dir /s/a "static" >> dir_all.txt
echo ==================== >> dir_all.txt

echo marktext-chinese-language-pack-main Directory: >> dir_all.txt
dir /s/a "marktext-chinese-language-pack-main" >> dir_all.txt

echo SRC Directory: >> dir_all.txt
dir /s/a "src" >> dir_all.txt
echo ==================== >> dir_all.txt

echo Electron-Vue Directory: >> dir_all.txt
dir /s/a ".electron-vue" >> dir_all.txt
echo ==================== >> dir_all.txt

echo Build Directory: >> dir_all.txt
dir /s/a "build" >> dir_all.txt
echo ==================== >> dir_all.txt

echo Directory list saved to dir_all.txt
pause 
