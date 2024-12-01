import { ServerResponse } from 'node:http'

import { Database } from '../db/database'
import { deleteTaskValidation } from '../validations/delete'

type DeleteTaskParams = {
  id: string
  database: Database
  res: ServerResponse
}

export function deleteTask({ id, database, res }: DeleteTaskParams) {
  deleteTaskValidation({ id, res, database })

  database.delete('task', id)
}
