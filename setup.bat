@echo off
echo ========================================
echo   Ecologist - Sistema de Gestion de Residuos
echo ========================================
echo.

echo [1/4] Instalando dependencias del backend...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo Error: No se pudieron instalar las dependencias del backend
    pause
    exit /b 1
)

echo.
echo [2/4] Creando base de datos y datos de prueba...
python seed_data.py
if errorlevel 1 (
    echo Error: No se pudo crear la base de datos
    pause
    exit /b 1
)

echo.
echo [3/4] Instalando dependencias del frontend...
cd ..
call npm install
if errorlevel 1 (
    echo Error: No se pudieron instalar las dependencias del frontend
    pause
    exit /b 1
)

echo.
echo [4/4] Configuracion completada!
echo.
echo ========================================
echo   INSTRUCCIONES PARA INICIAR
echo ========================================
echo.
echo 1. Abre una terminal y ejecuta:
echo    cd backend
echo    uvicorn app.main:app --reload
echo.
echo 2. Abre OTRA terminal y ejecuta:
echo    npm run dev
echo.
echo 3. Abre tu navegador en: http://localhost:5173
echo.
echo USUARIOS DE PRUEBA:
echo - Admin: admin@ecologist.com / admin123
echo - Cliente: cliente1@example.com / cliente123
echo.
echo ========================================
pause
