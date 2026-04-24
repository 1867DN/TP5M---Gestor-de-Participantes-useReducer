@echo off
echo Agregando 10 participantes de prueba a TP5M...
echo (El backend debe estar corriendo en localhost:8000)
echo.
python "%~dp0seed_participantes.py"
echo.
pause
