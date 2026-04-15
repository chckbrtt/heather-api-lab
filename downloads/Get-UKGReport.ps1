# ============================================
# UKG Ready API - Report Puller
# Heather's Starter Script
# ============================================

# --- CONFIGURATION ---
$BaseUrl    = "https://secure2.saashr.com/ta/rest"
$ApiKey     = "YOUR_API_KEY_HERE"
$Username   = "YOUR_USERNAME"
$Password   = "YOUR_PASSWORD"
$Company    = "YOUR_COMPANY"
$ReportId   = "YOUR_REPORT_ID"
$OutputFile  = "report_output.csv"

# --- STEP 1: AUTHENTICATE ---
Write-Host "Authenticating..." -ForegroundColor Cyan
$loginBody = @{
    credentials = @{
        username = $Username
        password = $Password
        company  = $Company
    }
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "$BaseUrl/v1/login" -Method POST `
    -Headers @{ "Api-Key" = $ApiKey; "Content-Type" = "application/json" } `
    -Body $loginBody

$token = $loginResponse.token
Write-Host "Got token: $($token.Substring(0,20))..." -ForegroundColor Green

# --- STEP 2: PULL REPORT ---
Write-Host "Pulling report $ReportId..." -ForegroundColor Cyan
$reportData = Invoke-RestMethod -Uri "$BaseUrl/v1/report/saved/$ReportId" `
    -Headers @{ "Authentication" = "Bearer $token"; "Accept" = "text/csv" }

# --- STEP 3: SAVE TO FILE ---
$reportData | Out-File -FilePath $OutputFile -Encoding UTF8
Write-Host "Saved to $OutputFile" -ForegroundColor Green
Write-Host "Done!" -ForegroundColor Green
