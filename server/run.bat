@echo off
echo Setting up FastAPI backend...

cd /d %~dp0

if not exist venv (
    python -m venv venv
)

call venv\Scripts\activate
pip install --upgrade pip

uvicorn main:app --host 0.0.0.0 --port 8000 --reload