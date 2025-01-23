@echo off

rem xcopy /E /I /Y "M:\cm\node_modules\*" "node_modules\*"

rem xcopy "G:\cm\build_node_modules\balanced-match" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\balanced-match\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\at-least-node" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\at-least-node\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\bcp47" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\bcp47\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\brace-expansion" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\brace-expansion\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\d3-collection" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\d3-collection\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\d3-voronoi" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\d3-voronoi\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\dagre" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\dagre\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\keyboard-layout" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\keyboard-layout\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\fontmanager-redux" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\fontmanager-redux\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\d3-geo-projection" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\d3-geo-projection\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\d3-time" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\d3-time\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\d3-timer" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\d3-timer\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\d3-transition" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\d3-transition\" /E /C /Y /I
rem xcopy "G:\cm\build_node_modules\dagre-d3" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\dagre-d3\" /E /C /Y /I

echo Copy old_node_modules to new_node_modules
xcopy /E /I /Y "g:\cm\build_node_modules\*" "G:\cm\ydm\build\win-unpacked\resources\app\node_modules\" >nul
