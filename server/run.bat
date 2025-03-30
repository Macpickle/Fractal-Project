@echo off
echo Setting up FastAPI backend...

cd /d %~dp0

if not exist venv (
    python -m venv venv
)

call venv\Scripts\activate
pip install --upgrade pip
pip install fastapi[all]
pip install uvicorn
pip install python-multipart

echo Starting FastAPI server...
start /b uvicorn main:app --host 0.0.0.0 --port 8000 --reload

:WAIT
curl -s http://127.0.0.1:8000 > nul
if errorlevel 1 (
    echo Server not ready. Waiting...
    timeout /t 5 > nul
    goto WAIT
)
