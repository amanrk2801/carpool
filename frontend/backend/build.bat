@echo off
echo Building CarpoolConnect Backend...

echo.
echo Cleaning previous builds...
call mvn clean

echo.
echo Compiling and packaging...
call mvn package -DskipTests

echo.
echo Build completed successfully!
echo.
echo To run the application:
echo   mvn spring-boot:run
echo.
echo To run with Docker:
echo   docker-compose up -d
echo.
pause
