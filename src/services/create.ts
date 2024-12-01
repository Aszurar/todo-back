import crypto from 'node:crypto'
import { ServerResponse } from 'node:http'

import { createTaskValidation } from '../validations/create'
import { Database } from './../db/database'
import { ICreatedRequestBody } from './../entities/RequestBody'
import { ITask } from './../entities/task'

type CreateTaskParams = {
  res: ServerResponse
  data: ICreatedRequestBody
  database: Database
}

export function createTask({ res, data, database }: CreateTaskParams) {
  createTaskValidation({ res, data })

  const { title, description } = data

  const newTask: ITask = {
    id: crypto.randomUUID(),
    title,
    description,
    created_at: new Date(),
    updated_at: new Date(),
    completed_at: null,
  }

  const task = database.insert('task', newTask)
  const taskParsed = JSON.stringify(task)

  return taskParsed
}
