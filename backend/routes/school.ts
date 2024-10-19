import express from 'express';
import { schoolService } from '../services/schoolService';

const router = express.Router();

// Create
router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const newSchool = await schoolService.create(req.body);
        res.status(201).json(newSchool);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Get all
router.get('/', async (req: express.Request, res: express.Response) => {
    const schools = await schoolService.findAll();
    res.json(schools);
});

// Get single
router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const todo = await schoolService.find(req.params.id);
        if (!todo) {
            throw new Error('School not found');
        }
        res.json(todo);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Update
router.put('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const updatedSchool = await schoolService.update(req.params.id, req.body);
        res.json(updatedSchool);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'School not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

// Delete
router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        await schoolService.remove(req.params.id);
        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: 'An unknown error occurred' });
        }
    }
});

export default router;