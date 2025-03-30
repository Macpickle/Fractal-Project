@echo off
echo Starting the application...

cd server
call run.bat

echo Server started. Now starting the client...
cd ..\client
call run.bat