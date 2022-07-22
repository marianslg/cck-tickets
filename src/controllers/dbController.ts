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
    const db = await openDb()

    const result = await db.all(`SELECT * FROM Events`)

    db.close()

    return JSON.stringify(result)
}

export async function saveEventOnDB(event: IEvent) {
    if (await existeEvent(event.id))
        await update(event)
    else
        await insert(event)
}

async function insert(event: IEvent) {
    db = await openDb()

    const output = await db.run(`INSERT INTO Events(id,url,event,name,souldOut,eventDate,eventTime,reserve,creationDatetime) VALUES(?,?,?,?,?,?,?,?,?)`,
        event.id, event.url, event.event, event.name, event.souldOut, event.eventDate, event.eventTime, event.reserve, new Date().toISOString())

    db.close();
}

async function update(event: IEvent) {
    db = await openDb()

    const output = await db.run(`UPDATE Events SET url = ?,event = ?,name = ?,souldOut = ?,eventDate = ?,eventTime = ?,reserve = ?, updateDatetime = ? WHERE id = ?`,
        event.url, event.event, event.name, event.souldOut, event.eventDate, event.eventTime, event.reserve, new Date().toISOString(), event.id)

    db.close();
}

async function existeEvent(id: number): Promise<any> {
    db = await openDb()

    const output = await db.all(`SELECT COUNT(*) AS Cantidad FROM Events WHERE id = ?`, id)

    db.close();

    return (output[0].Cantidad == 1)
}