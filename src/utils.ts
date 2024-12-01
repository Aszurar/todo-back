const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const

const ROUTES = {
  TASK: '/task',
} as const

export { METHODS, ROUTES }
