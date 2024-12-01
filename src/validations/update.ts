import { ServerResponse } from 'http'

import { Database } from '../db/database'
import { IUpdateRequestBody } from '../entities/RequestBody'
import { ERROR_MESSAGES } from '../utils'

type UpdateTaskValidationParams = {
  id: string
  res: ServerResponse
  data: IUpdateRequestBody
  database: Database
}

export function updateTaskValidation({
  id,
  res,
  data,
  database,
}: UpdateTaskValidationParams) {
  if (!data) {
    const message = JSON.stringify({
      error: ERROR_MESSAGES.updateBodyEmpty,
    })
    return res.writeHead(400).end({ error: message })
  }

  const task = database.findTaskById('task', id)

  if (!task) {
    const message = JSON.stringify({ error: ERROR_MESSAGES.taskNotFound })
    return res.writeHead(404).end(message)
  }

  const { title, description } = data
  const hasNotTitle = !title?.trim()
  const hasNotDescription = !description?.trim()

  if (hasNotTitle && hasNotDescription) {
    const message = JSON.stringify({
      error: ERROR_MESSAGES.updateBodyEmpty,
    })
    return res.writeHead(400).end({ error: message })
  }
}
