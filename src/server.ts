import http from 'node:http'

import { getBodyDataStreamAndParseJSON, IRequest } from './middleware/json'
import { routes } from './route'

const server = http.createServer(async (req, res) => {
  await getBodyDataStreamAndParseJSON(req as IRequest)

  const { method, url } = req

  const route = routes.find(
    (route) => route.method === method && route.path === url,
  )

  if (route) {
    console.log(`Request received for ${url} and method ${method}`)
    route.handler(req as IRequest, res)
  }
})

server.listen(3000, () => {
  console.log('🚀 Server is running on port 3000')
})
