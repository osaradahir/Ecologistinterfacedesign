@echo off
echo Iniciando Backend (FastAPI)...
cd backend
start cmd /k "uvicorn app.main:app --reload"
cd ..

timeout /t 3 /nobreak > nul

echo Iniciando Frontend (React)...
start cmd /k "npm run dev"

echo.
echo ========================================
echo   Servidores iniciados!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo Swagger Docs: http://localhost:8000/docs
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
