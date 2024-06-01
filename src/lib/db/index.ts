import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

export const libsql = createClient({
	url: `${process.env.DATABASE_URL}`,
	authToken: `${process.env.DATABASE_TOKEN}`
});

const adapter = new PrismaLibSQL(libsql);
const db = new PrismaClient({ adapter });

export default db;
