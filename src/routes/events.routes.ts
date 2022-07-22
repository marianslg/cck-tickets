import { Router, Request, Response } from 'express'
import { getAllEventsFromDataBase } from '../controllers/dbController'

const router = Router()

router.route('/getAllEvents').get((req: Request, res: Response) => {
    res.json(getAllEventsFromDataBase())
})

export default router