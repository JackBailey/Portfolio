import { defineDb, column, defineTable } from 'astro:db';

// https://astro.build/db/config

const Submission = defineTable({
  columns: {
    id: column.text({primaryKey: true}),
    name: column.text(),
    email: column.text(),
    message: column.text(),
    createdAt: column.date(),
    ipAddress: column.text(),
    userAgent: column.text(),
  }
});

export default defineDb({
  tables: {
    Submission,
  }
});
