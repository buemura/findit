import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { categories } from '../../modules/categories/categories.schema';
import { users } from '../../modules/users/users.schema';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const seedCategories = [
  { name: 'Web Development', slug: 'web-development', description: 'Websites and web applications' },
  { name: 'Mobile Development', slug: 'mobile-development', description: 'iOS and Android apps' },
  { name: 'UI/UX Design', slug: 'ui-ux-design', description: 'User interface and experience design' },
  { name: 'Graphic Design', slug: 'graphic-design', description: 'Logos, branding, and visual design' },
  { name: 'Writing', slug: 'writing', description: 'Content writing and copywriting' },
  { name: 'Marketing', slug: 'marketing', description: 'Digital marketing and SEO' },
  { name: 'Video Production', slug: 'video-production', description: 'Video editing and production' },
  { name: 'Photography', slug: 'photography', description: 'Professional photography services' },
  { name: 'Translation', slug: 'translation', description: 'Language translation services' },
  { name: 'Data Entry', slug: 'data-entry', description: 'Data entry and processing' },
  { name: 'Virtual Assistant', slug: 'virtual-assistant', description: 'Administrative support' },
  { name: 'Consulting', slug: 'consulting', description: 'Business and technical consulting' },
];

async function seed() {
  console.log('Seeding database...');

  // Seed categories
  console.log('Seeding categories...');
  for (const category of seedCategories) {
    try {
      await db.insert(categories).values(category).onConflictDoNothing();
    } catch (e) {
      console.log(`Category ${category.name} already exists`);
    }
  }
  console.log(`Seeded ${seedCategories.length} categories`);

  // Create admin user
  console.log('Creating admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  try {
    await db.insert(users).values({
      name: 'Admin',
      email: 'admin@findit.com',
      passwordHash: adminPassword,
      isAdmin: true,
      country: 'USA',
    }).onConflictDoNothing();
    console.log('Admin user created: admin@findit.com / admin123');
  } catch (e) {
    console.log('Admin user already exists');
  }

  console.log('Seeding complete!');
  await pool.end();
}

seed().catch((e) => {
  console.error('Seeding failed:', e);
  process.exit(1);
});
