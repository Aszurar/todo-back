import { ServerResponse } from 'node:http'

import { Database } from './db/database'
import { ICreateRequestBody, IUpdateRequestBody } from './entities/RequestBody'
import { IRequest } from './middleware/json'
import { createTask } from './services/create'
import { deleteTask } from './services/delete'
import { getAll } from './services/getAll'
import { patchTask } from './services/patch'
import { updateTask } from './services/update'
import { METHODS, ROUTES } from './utils'
import { buildRoutePath } from './utils/build-route-path'

const database = new Database()

type RouteProps = {
  method: (typeof METHODS)[keyof typeof METHODS]
  path: RegExp
  handler: (req: IRequest, res: ServerResponse) => void
}

export const routes: RouteProps[] = [
  {
    method: METHODS.GET,
    path: buildRoutePath('/'),
    handler: (req: IRequest, res: ServerResponse) => {
      const { title, description } = req.query

      const tasks = getAll({ database, title, description })

      return res.setHeader('Content-Type', 'application/json').end(tasks)
    },
  },
  {
    method: METHODS.POST,
    path: buildRoutePath(ROUTES.TASK),
    handler: (req: IRequest, res: ServerResponse) => {
      const data = req.body as ICreateRequestBody

      const task = createTask({ res, data, database })

      return res.writeHead(201).end(task)
    },
  },
  {
    method: METHODS.PATCH,
    path: buildRoutePath(`${ROUTES.TASK}/:id/complete`),
    handler: (req: IRequest, res: ServerResponse) => {
      const { id } = req.params

      patchTask({ id, database, res })

      return res.writeHead(204).end()
    },
  },
  {
    method: METHODS.PUT,
    path: buildRoutePath(`${ROUTES.TASK}/:id`),
    handler: (req: IRequest, res: ServerResponse) => {
      const { id } = req.params
      const { title, description } = req.body as IUpdateRequestBody

      updateTask({ id, res, data: { title, description }, database })

      return res.writeHead(204).end()
    },
  },
  {
    method: METHODS.DELETE,
    path: buildRoutePath(`${ROUTES.TASK}/:id`),
    handler: (req: IRequest, res: ServerResponse) => {
      const { id } = req.params

      deleteTask({ id, database, res })

      return res.writeHead(204).end()
    },
  },
]
