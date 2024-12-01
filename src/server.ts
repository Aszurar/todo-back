import http from 'node:http'

import { getBodyDataStreamAndParseJSON, IRequest } from './middleware/json'
import { routes } from './route'

const server = http.createServer(async (req, res) => {
  await getBodyDataStreamAndParseJSON(req as IRequest)

  const { method, url } = req as IRequest

  if (!method || !url) {
    res.writeHead(404).end()
    return
  }

  const route = routes.find(
    (route) => route.method === method && route.path.test(url),
  )

  if (route) {
    console.log(`Request received for ${url} and method ${method}`)
    const routeParams = url.match(route.path)
    req.params = { ...routeParams?.groups }
    return route.handler(req as IRequest, res)
  }

  return res.writeHead(404).end('Not found')
})

server.listen(3000, () => {
  console.log('🚀 Server is running on port 3000')
})
