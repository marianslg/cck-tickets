import { Server } from './server'
import { Worker } from './workers/worker'

const server = new Server()

const worker = new Worker()

worker.ScrapingEvents()
setInterval(worker.ScrapingEvents, 1000 * 60 * 60)

//worker.scrapingEvent(290)