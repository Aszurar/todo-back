import { ServerResponse } from 'node:http'

import { ERROR_MESSAGES } from '../utils'
import { updateTaskValidation } from '../validations/update'
import { Database } from './../db/database'
import { IUpdateRequestBody } from './../entities/RequestBody'
import { ITask } from './../entities/task'

type UpdateTaskParams = {
  id: string
  res: ServerResponse
  data: IUpdateRequestBody
  database: Database
}

export function updateTask({ id, res, data, database }: UpdateTaskParams) {
  updateTaskValidation({ res, data, database, id })

  const { title, description } = data

  let taskUpdated: ITask = {} as ITask

  const taskFound = database.findTaskById('task', id)

  if (!taskFound) {
    return res
      .writeHead(404)
      .end(JSON.stringify({ error: ERROR_MESSAGES.taskNotFound }))
  }

  if (title && description) {
    taskUpdated = {
      ...taskFound,
      title,
      description,
      updated_at: new Date(),
    }
  }

  const hasNotTitle = !title?.trim()
  const hasNotDescription = !description?.trim()

  if (hasNotTitle) {
    taskUpdated = {
      ...taskFound,
      description: description!,
      updated_at: new Date(),
    }
  }

  if (hasNotDescription) {
    taskUpdated = {
      ...taskFound,
      title: title!,
      updated_at: new Date(),
    }
  }

  const task = database.update('task', id, taskUpdated)
  const taskParsed = JSON.stringify(task)

  return taskParsed
}
