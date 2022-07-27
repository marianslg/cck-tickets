import { IEvent } from "./IEvent"
import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'
import path from 'path';

let db: Database

export async function openDb() {
    return open({
        filename: path.join(process.cwd() , 'sqlite', 'database.db'),
        driver: sqlite3.Database
    })
}

export async function getAllEventsFromDataBase(): Promise<any> {
    const db = await openDb()

    const result = await db.all(`SELECT * FROM Events`)

    db.close()

    return result
}

export async function getAllFutureEventsFromDataBase(): Promise<any> {
    const db = await openDb()

    const result = await db.all(`SELECT * FROM Events WHERE eventDate >= '${new Date().toISOString()}'`)

    db.close()

    return result
}

export async function saveEventOnDB(event: IEvent) {
    if (await existeEvent(event.id))
        await update(event)
    else
        await insert(event)
}

async function insert(event: IEvent) {
    db = await openDb()

    const output = await db.run(`INSERT INTO Events(id,url,event,name,soldOut,eventDate,eventTime,reserve,creationDatetime) VALUES(?,?,?,?,?,?,?,?,?)`,
        event.id, event.url, event.event, event.name, event.soldOut, event.eventDate, event.eventTime, event.reserve, new Date().toISOString())

    db.close();
}

async function update(event: IEvent) {
    db = await openDb()

    const output = await db.run(`UPDATE Events SET url = ?,event = ?,name = ?,soldOut = ?,eventDate = ?,eventTime = ?,reserve = ?, updateDatetime = ? WHERE id = ?`,
        event.url, event.event, event.name, event.soldOut, event.eventDate, event.eventTime, event.reserve, new Date().toISOString(), event.id)

    db.close();
}

async function existeEvent(id: number): Promise<any> {
    db = await openDb()

    const output = await db.all(`SELECT COUNT(*) AS Cantidad FROM Events WHERE id = ?`, id)

    db.close();

    return (output[0].Cantidad == 1)
}