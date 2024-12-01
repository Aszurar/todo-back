import { IncomingMessage } from 'node:http'

export type IRequest = IncomingMessage & {
  body: unknown
  params: { [key: string]: string }
  query: { [key: string]: string }
}

export async function getBodyDataStreamAndParseJSON(req: IRequest) {
  const buffer: Uint8Array[] = []

  for await (const chunk of req) {
    buffer.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffer).toString())
  } catch (error) {
    req.body = null
  }
}
