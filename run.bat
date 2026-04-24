@echo off
REM Script para ejecutar automaticamente Backend, Frontend y abrir navegador
REM Gestor de Participantes - TP5M
REM NOTA: Asegurate de que MySQL este corriendo y agrega la ruta al PATH

echo.
echo ====================================
echo    GESTOR DE PARTICIPANTES - TP5M
echo ====================================
echo.

REM Verificar que MySQL este ejecutandose
echo [1/5] Verificando MySQL...
mysql -u root -p"root" -e "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo.
    echo ADVERTENCIA: No se pudo conectar a MySQL
    echo Verifica que el servicio MySQL este corriendo y la contrasena sea correcta
    echo.
    echo Continuando... (presiona una tecla)
    pause
) else (
    echo OK - MySQL esta ejecutandose
)

REM Crear base de datos
echo.
echo [2/5] Creando base de datos tp5m_db...
mysql -u root -p"root" -e "CREATE DATABASE IF NOT EXISTS tp5m_db;" >nul 2>&1
echo OK - Base de datos lista

REM Instalar dependencias Backend si es necesario
echo.
echo [3/5] Verificando dependencias de Backend...
cd backend
pip install -q -r requirements.txt >nul 2>&1
echo OK - Backend listo

REM Instalar dependencias Frontend si es necesario
echo.
echo [4/5] Verificando dependencias de Frontend...
cd ..\frontend
call npm install -q >nul 2>&1
echo OK - Frontend listo

REM Iniciar Backend en nueva ventana
echo.
echo [5/5] Iniciando servidores...
cd ..\backend
start "Backend FastAPI - TP5M" cmd /k "uvicorn main:app --reload"
timeout /t 3 /nobreak

REM Iniciar Frontend en nueva ventana
cd ..\frontend
start "Frontend React - TP5M" cmd /k "npm run dev"
timeout /t 5 /nobreak

REM Abrir navegador
echo.
echo ====================================
echo  Abriendo navegador en 5 segundos...
echo ====================================
echo.
timeout /t 5 /nobreak
start http://localhost:5173

echo.
echo ====================================
echo  Aplicacion iniciada correctamente!
echo ====================================
echo.
echo URLS:
echo   Frontend:  http://localhost:5173
echo   Backend:   http://localhost:8000
echo   MySQL:     localhost:3306
echo.
echo Para detener la aplicacion:
echo   - Cierra las ventanas de Backend y Frontend
echo.
echo Puedes verificar los datos en MySQL Workbench:
echo   SELECT * FROM tp5m_db.participantes;
echo.
pause
