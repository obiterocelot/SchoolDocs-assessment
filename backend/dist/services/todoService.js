var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId({ length: 10 });
let todos = [];
export const todoService = {
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return todos;
    }),
    find: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return todos.find((t) => t.id === id);
    }),
    create: (title) => __awaiter(void 0, void 0, void 0, function* () {
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Title is required and must be a non-empty string');
        }
        const existingTodo = todos.find((t) => t.title.toLowerCase() === title.trim().toLowerCase());
        if (existingTodo) {
            throw new Error('A todo with this title already exists');
        }
        const newTodo = {
            id: uid.generate(),
            title: title.trim(),
            completed: false,
        };
        todos.push(newTodo);
        return newTodo;
    }),
    update: (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
        const todoIndex = todos.findIndex((t) => t.id === id);
        if (todoIndex === -1) {
            throw new Error('Todo not found');
        }
        const { title, completed } = updates;
        if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
            throw new Error('Title must be a non-empty string');
        }
        const updatedTodo = Object.assign({}, todos[todoIndex]);
        if (title !== undefined) {
            const existingTodo = todos.find((t) => t.id !== id && t.title.toLowerCase() === title.trim().toLowerCase());
            if (existingTodo) {
                throw new Error('A todo with this title already exists');
            }
            updatedTodo.title = title.trim();
        }
        if (completed !== undefined)
            updatedTodo.completed = Boolean(completed);
        todos[todoIndex] = updatedTodo;
        return updatedTodo;
    }),
    remove: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const todoIndex = todos.findIndex((t) => t.id === id);
        if (todoIndex === -1) {
            throw new Error('Todo not found');
        }
        todos.splice(todoIndex, 1);
    }),
};
