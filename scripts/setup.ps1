# Audit Portal Setup Script (PowerShell)
# This script helps you set up the application quickly on Windows

Write-Host "🚀 Audit Portal Setup" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if PostgreSQL is installed
try {
    $null = Get-Command psql -ErrorAction Stop
} catch {
    Write-Host "⚠️  PostgreSQL not detected locally." -ForegroundColor Yellow
    Write-Host "   You can either:" -ForegroundColor Yellow
    Write-Host "   1. Install PostgreSQL locally" -ForegroundColor Yellow
    Write-Host "   2. Use a cloud database (Supabase, Neon, Railway)" -ForegroundColor Yellow
    Write-Host ""
}

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host ""
    Write-Host "📝 Creating .env file..." -ForegroundColor Cyan
    Copy-Item .env.example .env
    Write-Host "✓ .env file created" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Please update .env with your database credentials" -ForegroundColor Yellow
    Write-Host "   Edit .env and set DATABASE_URL to your PostgreSQL connection string" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter after you've updated .env"
}

# Generate Prisma Client
Write-Host ""
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate

# Ask if user wants to push schema
Write-Host ""
$pushSchema = Read-Host "Do you want to push the database schema now? (y/n)"
if ($pushSchema -eq "y" -or $pushSchema -eq "Y") {
    Write-Host "📊 Pushing database schema..." -ForegroundColor Cyan
    npx prisma db push
    
    # Ask if user wants to seed
    Write-Host ""
    $seedDb = Read-Host "Do you want to seed the database with initial data? (y/n)"
    if ($seedDb -eq "y" -or $seedDb -eq "Y") {
        Write-Host "🌱 Seeding database..." -ForegroundColor Cyan
        npm run db:seed
        Write-Host "✓ Database seeded successfully" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server, run:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open http://localhost:3000 in your browser" -ForegroundColor Cyan
Write-Host ""
Write-Host "Default users (after seeding):" -ForegroundColor Cyan
Write-Host "  - michael.chen@surepass.com (admin)" -ForegroundColor White
Write-Host "  - sarah.johnson@surepass.com (auditor)" -ForegroundColor White
Write-Host "  - emily.rodriguez@surepass.com (compliance)" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "  - README.md - Getting started guide" -ForegroundColor White
Write-Host "  - API.md - API documentation" -ForegroundColor White
Write-Host "  - DEPLOYMENT.md - Deployment guide" -ForegroundColor White
Write-Host "  - MIGRATION.md - Migration from localStorage" -ForegroundColor White
Write-Host ""
