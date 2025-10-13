require('dotenv').config();
const fs = require('fs');
const path = require('path');
const prisma = require('../backend/src/models/prisma');

const processedNewsPath = path.join(__dirname, '../scheduler/processedNews.json');

async function seedDatabase() {
  console.log('🌱 Seeding database from processedNews.json...\n');

  try {
    // Check if processedNews.json exists
    if (!fs.existsSync(processedNewsPath)) {
      console.log('⚠️  No processedNews.json found. Skipping seed.');
      return;
    }

    // Read existing processed news
    const rawData = fs.readFileSync(processedNewsPath, 'utf8');
    const titles = JSON.parse(rawData);

    console.log(`Found ${titles.length} titles in processedNews.json`);

    let added = 0;
    let skipped = 0;

    for (const title of titles) {
      try {
        // Check if already exists
        const existing = await prisma.article.findUnique({
          where: { title },
        });

        if (existing) {
          skipped++;
          continue;
        }

        // Create article with minimal data (since we only have titles)
        await prisma.article.create({
          data: {
            title,
            content: 'Historical article - content not available',
            source: 'Unknown',
            sentiment: 'NEUTRAL',
            publishedAt: new Date(),
            analyzedAt: new Date(),
          },
        });

        added++;
        console.log(`✓ Added: ${title.substring(0, 80)}...`);
      } catch (err) {
        console.error(`✗ Failed to add "${title}":`, err.message);
      }
    }

    console.log(`\n✅ Seed complete: ${added} added, ${skipped} skipped\n`);
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seed
seedDatabase();
