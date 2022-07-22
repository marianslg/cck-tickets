import express, { Application} from 'express'
import eventsRoutes from './routes/events.routes'
import indexRoutes from './routes/index.routes'

export class Server {
    app: Application

    constructor() {
        this.app = express()

        this.init()

        this.app.use(indexRoutes)
        this.app.use(eventsRoutes)        
    }

    private init() {
        const port = process.env.PORT || 5000

        this.app.listen(port)

        console.log('Server on port', port);
    }
}