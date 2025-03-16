@echo off
echo Setting up React frontend...

cd /d %~dp0

if not exist node_modules (
    npm install
)

npm start