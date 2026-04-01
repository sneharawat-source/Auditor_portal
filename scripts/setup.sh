#!/bin/bash

# Audit Portal Setup Script
# This script helps you set up the application quickly

set -e

echo "🚀 Audit Portal Setup"
echo "===================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js $(node --version) detected"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not detected locally."
    echo "   You can either:"
    echo "   1. Install PostgreSQL locally"
    echo "   2. Use a cloud database (Supabase, Neon, Railway)"
    echo ""
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please update .env with your database credentials"
    echo "   Edit .env and set DATABASE_URL to your PostgreSQL connection string"
    echo ""
    read -p "Press Enter after you've updated .env..."
fi

# Generate Prisma Client
echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Ask if user wants to push schema
echo ""
read -p "Do you want to push the database schema now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📊 Pushing database schema..."
    npx prisma db push
    
    # Ask if user wants to seed
    echo ""
    read -p "Do you want to seed the database with initial data? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🌱 Seeding database..."
        npm run db:seed
        echo "✓ Database seeded successfully"
    fi
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "Default users (after seeding):"
echo "  - michael.chen@surepass.com (admin)"
echo "  - sarah.johnson@surepass.com (auditor)"
echo "  - emily.rodriguez@surepass.com (compliance)"
echo ""
echo "📚 Documentation:"
echo "  - README.md - Getting started guide"
echo "  - API.md - API documentation"
echo "  - DEPLOYMENT.md - Deployment guide"
echo "  - MIGRATION.md - Migration from localStorage"
echo ""
