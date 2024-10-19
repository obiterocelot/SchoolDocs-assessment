import express from 'express';
import { schoolService } from '../services/schoolService';

const router = express.Router();

// Create School
router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const newTodo = await schoolService.create(req.body.title);
        res.status(201).json(newTodo);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

export default router;