import { ServerResponse } from 'http'

import { ICreatedRequestBody } from '../entities/RequestBody'

type createTaskValidationParams = {
  res: ServerResponse
  data: ICreatedRequestBody
}

export function createTaskValidation({
  res,
  data,
}: createTaskValidationParams) {
  if (!data) {
    return res.writeHead(400).end()
  }

  const { title, description } = data

  const hasNotDescription = !description?.trim()
  if (hasNotDescription) {
    return res.writeHead(400).end()
  }

  const hasNotTitle = !title?.trim()
  if (hasNotTitle) {
    return res.writeHead(400).end()
  }
}
