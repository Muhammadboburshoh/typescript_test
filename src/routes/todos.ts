import { Router } from 'express';

import { Todo } from '../models/todos';

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text
  };

  todos.push(newTodo);
  res.status(201).json({ message: 'Ok', todo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams
  const tid = params.todoId;
  const title = req.body.text;
  const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
  if (todoIndex > 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: title };
    return res.status(200).json({ message: 'update todo', todos: todos });
  }

  res.status(4004).json({ message: 'not found' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams
  todos = todos.filter(todoItem => todoItem.id !== params.todoId);
  return res.status(201).json({ message: 'deleted', todos: todos });
});

export default router;
