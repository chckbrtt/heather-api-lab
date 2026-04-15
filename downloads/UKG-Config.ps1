# ============================================
# UKG Ready API - Configuration Template
# Fill in YOUR values below
# ============================================

# Base URL (don't change unless instructed)
$BaseUrl = "https://secure2.saashr.com/ta/rest"

# v1 API Credentials
$ApiKey   = "YOUR_API_KEY_HERE"
$Username = "YOUR_USERNAME"
$Password = "YOUR_PASSWORD"
$Company  = "YOUR_COMPANY_SHORT_NAME"

# v2 OAuth2 Credentials
$CompanyId    = "YOUR_COMPANY_ID_NUMBER"
$ClientId     = "YOUR_CLIENT_ID"
$ClientSecret = "YOUR_CLIENT_SECRET"

# Common Report IDs (fill in as you discover them)
$RosterReportId = ""
$GLDetailReportId = ""

# Verify config
Write-Host "=== UKG API Configuration ===" -ForegroundColor Cyan
Write-Host "Base URL:    $BaseUrl"
Write-Host "Company:     $Company"
Write-Host "Username:    $Username"
Write-Host "Client ID:   $($ClientId.Substring(0, [Math]::Min(8, $ClientId.Length)))..."
Write-Host "Config loaded!" -ForegroundColor Green
