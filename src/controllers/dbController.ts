import { IEvent } from "./IEvent"
import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'

let db: Database

export async function openDb() {
    return open({
        filename: process.cwd() + '\\sqlite\\database.db',
        driver: sqlite3.Database
    })
}

export async function getAllEventsFromDataBase(): Promise<string> {
    try {
        const db = await openDb()

        db.each("SELECT * FROM Events", (err, row) => {
            if (err) {
                console.error(`getAllEvents - ${err.message}`);
            } else {
                return JSON.stringify(row);
            }
        });
    }
    catch (ex) {
        console.error(`connect - ${ex}`);
    }

    return ""
}

export async function saveEventOnDB(event: IEvent) {
    //db = await openDb()

    if (await existeEvent(event.id))
        await update(event)
    else
        await insert(event)

    //db.close();
}

async function insert(event: IEvent) {
    db = await openDb()

    const output = await db.run(`INSERT INTO Events(id,url,event,name,souldOut,eventDate,eventTime,reserve,creationDatetime) VALUES(?,?,?,?,?,?,?,?,?)`,
        event.id, event.url, event.event, event.name, event.souldOut, event.eventDate, event.eventTime, event.reserve, new Date().toISOString())

    db.close();
}

async function update(event: IEvent) {
    const output = await db.run(`UPDATE Events SET url = ?,event = ?,name = ?,souldOut = ?,eventDate = ?,eventTime = ?,reserve = ?, updateDatetime = ? WHERE id = ?`,
        event.url, event.event, event.name, event.souldOut, event.eventDate, event.eventTime, event.reserve, new Date().toISOString(), event.id)

    db.close();
}

async function existeEvent(id: number): Promise<any> {
    db = await openDb()

    const output = await db.all(`SELECT COUNT(*) AS Cantidad FROM Events WHERE id = ?`, id)

    return (output[0].Cantidad == 1)
}