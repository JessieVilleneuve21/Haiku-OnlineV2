import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { drizzle } from "drizzle-orm/libsql";
import { messagesTable, usersTable } from "./schemas/schema.js";
import seedData from "./01_seed.json" with {type: 'json'};

const {users, messages} = seedData;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envFile = process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.local';

// // chemin à corriger au besoin
dotenv.config({ path: __dirname + "/../../" + envFile });

const db = drizzle({  
  connection: {url: process.env.DATABASE_URL, authToken: process.env.DATABASE_AUTH_TOKEN}
});

console.log("[DELETING MESSAGES AND USERS FROM DB]");
await db.delete(messagesTable);
await db.delete(usersTable);

const insertWithDelay = async (data, table, batchSize = 10, delayMs = 500) => {
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    console.log(`[INSERTING DATA] batch ${i / batchSize + 1}`);
    await db.insert(table).values(batch).onConflictDoNothing();

    if (i + batchSize < data.length) {
      console.log(`[WAITING ${delayMs}ms before next batch...]`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

await insertWithDelay(
  users,
  usersTable,
  5,
  1000,
);

await insertWithDelay(
  messages,
  messagesTable,
  5,
  1000,
);
console.log("[DONE]");
