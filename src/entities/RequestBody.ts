interface ICreateRequestBody {
  title: string
  description: string
}

interface IUpdateRequestBody {
  title?: string
  description?: string
}

export { ICreateRequestBody, IUpdateRequestBody }
