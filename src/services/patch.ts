import { ServerResponse } from 'node:http'

import { Database } from '../db/database'
import { patchTaskValidation } from '../validations/patch'

type PatchTaskParams = {
  id: string
  database: Database
  res: ServerResponse
}

export function patchTask({ id, database, res }: PatchTaskParams) {
  patchTaskValidation({ id, res, database })

  database.patchCompleteTask('task', id)
}
