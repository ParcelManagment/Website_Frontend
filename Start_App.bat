@echo off
SET PORT=3000

REM Find the PID of the process running on port 3000
FOR /F "tokens=5" %%P IN ('netstat -aon ^| findstr :%PORT%') DO TaskKill.exe /PID %%P /F

REM Start your React application
cd login-signup
npm start

