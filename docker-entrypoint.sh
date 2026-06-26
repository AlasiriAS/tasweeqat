#!/bin/sh
set -e

echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database (if empty)..."
# Only seed if no users exist
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.count().then(count => {
  if (count === 0) {
    console.log('No users found — running seed...');
    require('child_process').execSync('npx prisma db seed', { stdio: 'inherit' });
  } else {
    console.log('Database already seeded, skipping.');
  }
  prisma.\$disconnect();
}).catch(console.error);
"

echo "🚀 Starting Tasweeqat..."
node server.js
