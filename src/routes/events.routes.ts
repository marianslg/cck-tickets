import { Router, Request, Response } from 'express'
import { getAllEventsFromDataBase } from '../controllers/dbController'

const router = Router()

router.route('/getAllEvents').get(async (req: Request, res: Response) => {
    res.json(await getAllEventsFromDataBase())
})

export default router