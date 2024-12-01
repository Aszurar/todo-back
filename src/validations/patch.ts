import { ServerResponse } from 'node:http'

import { Database } from '../db/database'
import { ERROR_MESSAGES } from '../utils'

type PatchTaskValidationParams = {
  id: string
  database: Database
  res: ServerResponse
}

export function patchTaskValidation({
  id,
  res,
  database,
}: PatchTaskValidationParams) {
  const hasId = id?.trim()
  if (!hasId) {
    const message = JSON.stringify({ error: ERROR_MESSAGES.missingId })
    return res.writeHead(400).end(message)
  }

  const task = database.findTaskById('task', id)

  if (!task) {
    const message = JSON.stringify({ error: ERROR_MESSAGES.taskNotFound })
    return res.writeHead(404).end(message)
  }
}
