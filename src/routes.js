import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const tasks = []

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      return res.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: async (req, res) => {
      const task = req.body;

      if (!task.title || !task.description) {
        return res.writeHead(400).end("Title and description are required.")
      }

      const now = new Date()
      task.id = randomUUID()
      task.completed_at = null
      task.created_at = now
      task.updated_at = now

      tasks.push(task);

      return res.writeHead(201).end(JSON.stringify(task))
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: async (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const task = tasks.find(task => {
        return task.id === id
      })

      if (!task) {
        return res.writeHead(400).end(`Task with id=${id} not found.`)
      }

      if (!title && !description) {
        return res.writeHead(400).end("Title or description are required.")
      }

      task.updated_at = new Date()
      task.title = title ? title : task.title;
      task.description = description ? description : task.description;

      return res.writeHead(204).end()
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: async (req, res) => {
      const { id } = req.params
      const rowIndex = tasks.findIndex(row => row.id === id)

      if (rowIndex > -1) {
        tasks.splice(rowIndex, 1)
        return res.writeHead(204).end()
      }

      return res.writeHead(400).end(`Task with id=${id} not found.`)
    }
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: async (req, res) => {
      const { id } = req.params

      const task = tasks.find(task => {
        return task.id === id
      })

      if (!task) {
        return res.writeHead(400).end(`Task with id=${id} not found.`)
      }

      task.completed_at = task.completed_at === null ? new Date() : null;

      return res.writeHead(204).end()
    }
  },
]
