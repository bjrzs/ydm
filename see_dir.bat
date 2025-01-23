@echo off
echo ==================== > dir_all.txt
echo Root Directory: >> dir_all.txt
dir >> dir_all.txt
echo ==================== >> dir_all.txt

echo locales Directory: >> dir_all.txt
dir /s/a "locales" >> dir_all.txt
echo ==================== >> dir_all.txt

echo SRC Directory: >> dir_all.txt
dir /s/a "src" >> dir_all.txt
echo ==================== >> dir_all.txt

echo Electron-Vue Directory: >> dir_all.txt
dir /s/a ".electron-vue" >> dir_all.txt
echo ==================== >> dir_all.txt

echo build Directory: >> dir_all.txt
dir /s/a "build" >> dir_all.txt
echo ==================== >> dir_all.txt

echo Directory list saved to dir_all.txt
pause 
