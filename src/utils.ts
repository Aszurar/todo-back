const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

const ROUTES = {
  TASK: '/task',
} as const

const ERROR_MESSAGES = {
  missingId: 'Id is required',
  taskNotFound: 'Task not found',
  updateBodyEmpty: 'Title or description is required',
}

export { ERROR_MESSAGES, METHODS, ROUTES }
