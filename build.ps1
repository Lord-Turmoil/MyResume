if (Test-Path dist) {
    Write-Host "Removing build folder" -ForegroundColor Yellow
    Remove-Item -Path dist -Recurse -Force
}

Write-Host "Building project" -ForegroundColor Blue
Copy-Item -Path js -Destination dist/js -Recurse
Copy-Item -Path css -Destination dist/css -Recurse
Copy-Item -Path index.html -Destination dist
Copy-Item -Path favicon.png -Destination dist
Copy-Item -Path avatar.svg -Destination dist
Copy-Item -Path "data.json" -Destination dist

Write-Host "Project built successfully" -ForegroundColor Green
