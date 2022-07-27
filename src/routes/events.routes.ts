import { Router, Request, Response } from 'express'
import { getAllEventsFromDataBase, getAllFutureEventsFromDataBase } from '../controllers/dbController'

const router = Router()

router.route('/getAllEvents').get(async (req: Request, res: Response) => {
    res.json(await getAllEventsFromDataBase())
})

router.route('/getAllFutureEvents').get(async (req: Request, res: Response) => {
    res.json(await getAllFutureEventsFromDataBase())
})

export default router