import { Database } from '@db/sqlite';

export function registerDatabase(): Database {
    const db = new Database(':memory:');
    db.exec("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT not null, age INTEGER not null)");

    return db;
}
