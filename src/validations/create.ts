import { ServerResponse } from 'http'

import { ICreateRequestBody } from '../entities/RequestBody'

type CreateTaskValidationParams = {
  res: ServerResponse
  data: ICreateRequestBody
}

export function createTaskValidation({
  res,
  data,
}: CreateTaskValidationParams) {
  if (!data) {
    return res.writeHead(400).end()
  }

  const { title, description } = data

  const hasNotDescription = !description?.trim()
  if (hasNotDescription) {
    const message = JSON.stringify({ error: 'Description is required' })
    return res.writeHead(400).end(message)
  }

  const hasNotTitle = !title?.trim()
  if (hasNotTitle) {
    const message = JSON.stringify({ error: 'Title is required' })
    return res.writeHead(400).end(message)
  }
}
