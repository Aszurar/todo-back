import { Database } from '../db/database'
import { ITask } from '../entities/task'

export function getAll(database: Database) {
  const data: ITask[] = database.select('task')
  const tasks = JSON.stringify(data)

  return tasks
}
