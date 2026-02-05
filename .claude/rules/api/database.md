# Database Rules

## ORM & Driver

- **ORM**: Drizzle ORM with `pg` driver
- **Database**: PostgreSQL 16
- **Client singleton**: `src/infrastructure/database/client.ts` exports `db` and `Database` type

## Schema Organization

- Each module defines its own schema in `<module>.schema.ts`
- All schemas are re-exported through `src/infrastructure/database/schema.ts` (barrel file used by Drizzle config)
- Schema file must export: table definition, relations, and any pgEnum types

## ID Generation

- All primary keys use `text` type with CUID2: `text('id').primaryKey().$defaultFn(() => createId())`
- Import `createId` from `@paralleldrive/cuid2`
- IDs are generated at insert time via `$defaultFn()`

## Timestamps

- All tables must include `createdAt` and `updatedAt` with timezone:
  ```typescript
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  ```
- `updatedAt` is manually set in repository update methods: `{ ...data, updatedAt: new Date() }`
- There is no automatic `onUpdate` trigger; repositories are responsible for updating this field

## Column Naming

- Database columns use `snake_case`: `password_hash`, `check_in_date`, `user_id`
- TypeScript properties use `camelCase`: `passwordHash`, `checkInDate`, `userId`
- Drizzle mapping: `camelCase('snake_case')` e.g. `text('password_hash')`

## Foreign Keys

- Use `.references(() => table.column, { onDelete: 'cascade' })` for user-owned data
- Cascade deletes ensure cleanup when a user is deleted
- FK columns follow the pattern `<entity>Id` / `<entity>_id`

## Enums

- Define PostgreSQL enums with `pgEnum`:
  ```typescript
  export const weightUnitEnum = pgEnum("weight_unit", ["kg", "lbs"]);
  ```
- Current enums:
  - `weight_unit`: kg, lbs
  - `muscle_group`: chest, back, shoulders, biceps, triceps, forearms, core, quadriceps, hamstrings, glutes, calves, full_body
  - `achievement_type`: streak, consistency, milestone

## Relations

- Define relations using `relations()` from `drizzle-orm` alongside each table
- Use `one()` for belongs-to and has-one; `many()` for has-many
- Relations are used by the Drizzle relational query API (`db.query.table.findMany({ with: { ... } })`)

## Repository Pattern

- Each module has a repository class that receives `Database` via constructor injection
- Repositories are instantiated in route files alongside their services
- Instantiation pattern:
  ```typescript
  const repository = new SomeRepository(db);
  const service = new SomeService(repository);
  ```

### Query conventions

- Single-row lookups: `.select().from(table).where(eq(col, val)).limit(1)` with `result[0] ?? null`
- Inserts: `.insert(table).values(data).returning()` with `result[0]!`
- Updates: `.update(table).set({ ...data, updatedAt: new Date() }).where(...).returning()`
- Deletes: `.delete(table).where(...)`
- Always use `.returning()` for insert and update operations

### Operators

- `eq()` for equality
- `gte()`, `lte()` for range comparisons
- `and()` to combine conditions
- `desc()` for descending order
- `sql` tagged template for raw SQL (PostgreSQL-specific features)

### Filtering & Pagination

- Build conditions dynamically with an array, then spread into `and()`:
  ```typescript
  const conditions = [eq(table.userId, userId)];
  if (filter) conditions.push(gte(table.date, filter));
  return db
    .select()
    .from(table)
    .where(and(...conditions))
    .limit(limit)
    .offset(offset);
  ```
- Default pagination: limit 20, offset 0

### Array column queries

- Use raw SQL for PostgreSQL array operations:
  ```typescript
  conditions.push(sql`${value} = ANY(${table.arrayColumn})`);
  ```

### Aggregation

- Count: `sql<number>\`count(\*)::int\``
- Array unnest: use `db.execute(sql\`...\`)`with`unnest()`and`GROUP BY`
- Type-cast results from `db.execute()` manually

### Relational queries

- Use `db.query.table.findMany({ where: ..., with: { relation: true } })` when you need to load related records
- Standard select API is preferred for simple queries

## Migration Workflow

```bash
pnpm db:generate   # Generate migration SQL from schema changes
pnpm db:migrate    # Apply migrations to database
pnpm db:push       # Push schema directly (development only)
pnpm db:studio     # Open Drizzle Studio web UI
pnpm db:seed       # Seed achievements table
```

- Drizzle config: `drizzle.config.ts` at api root
- Migration output directory: `drizzle/`
- Always run `db:generate` after schema changes to create migration files

## Seed Data

- Seed script: `src/infrastructure/database/seed.ts`
- Seeds default achievements only (7 records: first_checkin, streak_7, streak_30, streak_100, checkins_10, checkins_50, checkins_100)
- Idempotent: skips insert if achievements already exist
- Run via `pnpm db:seed` (executed with tsx)

## Important Notes

- No explicit database transactions are used. Multi-step operations (e.g., create check-in + update streak) are not atomic.
- Array columns (e.g., `muscleGroups`) require type assertions when inserting: `data as typeof table.$inferInsert`
- The `postgres()` client uses default connection pooling settings.
- Unique constraints exist on: `users.email`, `streaks.userId`, `achievements.code`
