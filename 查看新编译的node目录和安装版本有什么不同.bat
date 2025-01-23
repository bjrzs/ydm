@echo off


echo new_build_node_modules Directory: >> new_build_node_modules.txt
dir /ad "G:\cm\ydm\build\win-unpacked\resources\app\node_modules" >> new_build_node_modules.txt
echo ==================== >> new_build_node_modules.txt


echo old_build_node_modules Directory: >> old_build_node_modules.txt
dir /ad "G:\cm\build_node_modules" >> old_build_node_modules.txt
echo ==================== >> old_build_node_modules.txt

