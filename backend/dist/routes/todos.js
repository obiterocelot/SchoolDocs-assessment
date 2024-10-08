var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { todoService } from '../services/todoService.js'; // Note the .js extension
const router = express.Router();
// Create a todo
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = yield todoService.create(req.body.title);
        res.status(201).json(newTodo);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}));
// Get all todos
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todoService.findAll();
    res.json(todos);
}));
// Get a single todo
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todoService.find(req.params.id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        res.json(todo);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}));
// Update a todo
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTodo = yield todoService.update(req.params.id, req.body);
        res.json(updatedTodo);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Todo not found') {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(400).json({ error: error.message });
            }
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}));
// Delete a todo
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todoService.remove(req.params.id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(404).json({ error: 'An unknown error occurred' });
        }
    }
}));
export default router;
