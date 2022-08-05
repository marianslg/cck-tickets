import express, { Application} from 'express'
import eventsRoutes from './routes/events.routes'
import indexRoutes from './routes/index.routes'
import cors from "cors";

const corsOptions = {
    origin: 'https://marianslg.github.io',
    optionsSuccessStatus: 200
}

export class Server {
    app: Application

    constructor() {
        this.app = express()

        this.init()

        this.app.use(indexRoutes)
        this.app.use(eventsRoutes)
        this.app.use(cors(corsOptions))
    }

    private init() {
        const port = process.env.PORT || 5000

        this.app.listen(port)

        console.log('Server on port', port);
    }
}