const packages = await glob(['prisma/migrations/*/migration.sql'])

if (argv.name === undefined || typeof argv.name !== 'string') {
  console.error('require name argument(ex --name <migration name>)')
  process.exit(1)
}

await $`pnpm prisma migrate dev --name ${argv.name}`

await $`mkdir -p ./migrations`

for (let i =0; i < packages.length; i++) {
  const migrationName = packages[i].replace('prisma/migrations/', '').split('/')[0]
  await $`cp ${packages[i]} migrations/${migrationName}.sql`
}

await $`pnpm wrangler d1 migrations apply --local ${argv.dbName ? argv.dbName : 'mydb'}`
