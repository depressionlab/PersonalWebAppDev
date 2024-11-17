import { Database } from '@db/sqlite';

export function registerDatabase(): Database {
	const dbUrl = new URL("./people.db", import.meta.url);
	const db = new Database(dbUrl);
	db.exec('CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT not null, age INTEGER not null)');

	return db;
}
