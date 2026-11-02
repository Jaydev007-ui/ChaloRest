@echo off
set JAVA_HOME=C:\Users\ACER\.jdk17\jdk17.0.21_0
set ANDROID_HOME=C:\Users\ACER\.android-sdk
set PATH=%JAVA_HOME%\bin;%PATH%
cd /d "%~dp0"
call gradlew.bat assembleDebug --no-daemon
