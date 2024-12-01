import { Database } from '../db/database'
import { ITask } from '../entities/task'

type GetAllParams = {
  title?: string
  database: Database
  description?: string
}

export function getAll({ database, title, description }: GetAllParams) {
  const titleParsed = decodeURIComponent(title ?? '')
  const descriptionParsed = decodeURIComponent(description ?? '')

  const filters: Record<string, string> = {}

  if (titleParsed) filters.title = titleParsed
  if (descriptionParsed) filters.description = descriptionParsed

  const data: ITask[] = database.select({ table: 'task', ...filters })
  const tasks = JSON.stringify(data)

  return tasks
}
