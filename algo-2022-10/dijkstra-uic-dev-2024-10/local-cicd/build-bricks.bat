cd ..\bricks-runner
call npm run build

cd ..

mkdir demo\bricks-static
xcopy /e /y bricks-runner\temp\bricks demo\bricks-static
