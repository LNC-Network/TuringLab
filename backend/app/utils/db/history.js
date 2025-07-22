import {DatabaseSync} from 'node:sqlite';
const database = new DatabaseSync('../../database/db.sqlite');

// Execute SQL statements from strings.
database.exec(`
  CREATE TABLE history(
    key AUTO INTEGER PRIMARY KEY,
    name TEXT,
    created Date,
    created-time INTEGER,
    last-edited Date,
    last-edited-time INTEGER
  ) STRICT
`);

const getDate = () => {
    // TODO 
    // GET THE CURRENT DATE
    // return THE DATE WITH APPROPIATE FORMAT
}

const getTime = () => {
    // TODO
    // get current system time
    // convert the time into integer
    // 12H-30M-20S - to - 123020
    // return
}
/**
 * Write a documentation
 */
export function InsertHistory(name) {
    // TODO - Complete this but dont run the create history table
    const insert = database.prepare('INSERT INTO history (name,created,last-edited) VALUES (?, ?, ?)');

    const time = getTime();

    insert.run(name, getDate(), time, getDate(), time);
}

