import { IncomingMessage } from 'node:http'

export type IRequest = IncomingMessage & {
  body: unknown
  params: { [key: string]: string }
  query: { [key: string]: string }
}

/**
 * Middleware para processamento de dados do corpo da requisição (body) em JSON.
 *
 * Esta função é utilizada em servidores Node.js criados com o módulo HTTP puro.
 * Ela coleta os dados do corpo da requisição, que chegam como um fluxo de dados (stream),
 * e os converte em um objeto JSON acessível por meio de `req.body`.
 *
 * Caso os dados não sejam um JSON válido, `req.body` será definido como `null`.
 *
 * @param {IRequest} req - O objeto da requisição HTTP.
 *
 * @example
 * const http = require('http');
 * const { json } = require('./middleware');
 *
 * const server = http.createServer(async (req, res) => {
 *   await json(req, res);
 *
 *   if (req.method === 'POST') {
 *     console.log(req.body); // Dados do body como objeto JSON
 *   }
 *
 *   res.writeHead(200, { 'Content-Type': 'application/json' });
 *   res.end(JSON.stringify({ message: 'Request processed' }));
 * });
 *
 * server.listen(3000, () => {
 *   console.log('Server running on port 3000');
 * });
 */
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
