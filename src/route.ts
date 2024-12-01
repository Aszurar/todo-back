import { ServerResponse } from 'node:http'

import { Database } from './db/database'
import { ICreatedRequestBody } from './entities/RequestBody'
import { IRequest } from './middleware/json'
import { createTask } from './services/create'
import { getAll } from './services/getAll'
import { METHODS, ROUTES } from './utils'

const database = new Database()

export const routes = [
  {
    method: METHODS.GET,
    path: '/',
    handler: (req: IRequest, res: ServerResponse) => {
      const tasks = getAll(database)

      return res.setHeader('Content-Type', 'application/json').end(tasks)
    },
  },
  {
    method: METHODS.POST,
    path: ROUTES.TASK,
    handler: (req: IRequest, res: ServerResponse) => {
      const data = req.body as ICreatedRequestBody

      const task = createTask({ res, data, database })

      return res.writeHead(201).end(task)
    },
  },
]
