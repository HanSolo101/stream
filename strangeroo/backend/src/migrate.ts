import fs from 'fs';
import path from 'path';
import { db } from './common/db.js';

async function migrate() {
  // Resolve migrations relative to the project root (one level up from src/)
  const migrationsDir = path.resolve(process.cwd(), 'migrations');
  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  // Ensure migrations table exists
  await db.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      ran_at TIMESTAMPTZ DEFAULT now()
    )
  `);

  for (const file of migrationFiles) {
    const { rows } = await db.query(
      'SELECT id FROM _migrations WHERE filename = $1',
      [file],
    );
    if (rows.length > 0) {
      console.info(`[Migrate] Skipping ${file} (already ran)`);
      continue;
    }

    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO _migrations (filename) VALUES ($1)', [file]);
      await client.query('COMMIT');
      console.info(`[Migrate] ✓ ${file}`);
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`[Migrate] ✗ ${file}:`, (err as Error).message);
      process.exit(1);
    } finally {
      client.release();
    }
  }

  console.info('[Migrate] All migrations done.');
  await db.end();
}

migrate();
