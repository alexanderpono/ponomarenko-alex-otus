cd ../app-dev
call npm run build

cd ..

mkdir demo\app-static
xcopy /e /y app-dev\temp\ui-dist\*.* demo\app-static
