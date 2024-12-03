import fs from 'node:fs/promises'

import { ITask } from '../entities/task'

const databasePath = new URL('../db/db.json', import.meta.url)

type IDatabase = {
  [key: string]: ITask[]
}

type SelectParams = {
  table: string
  title?: string
  description?: string
}

export class Database {
  #database: IDatabase = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#database = {}
      })
  }

  select({ table, title, description }: SelectParams) {
    let data: ITask[] = this.#database[table] ?? []

    if (title && description) {
      return (data = data.filter(
        (task) =>
          task.title.toLowerCase().includes(title.toLowerCase()) &&
          task.description.toLowerCase().includes(description.toLowerCase()),
      ))
    }
    if (title) {
      return (data = data.filter((task) =>
        task.title.toLowerCase().includes(title.toLowerCase()),
      ))
    }
    if (description) {
      return (data = data.filter((task) =>
        task.description.toLowerCase().includes(description.toLowerCase()),
      ))
    }

    return data
  }

  findTaskById(table: string, id: string) {
    const task = this.#database[table].find((task) => task.id === id)

    return task
  }

  #persist() {
    const dataFormatted = JSON.stringify(this.#database)
    fs.writeFile(databasePath, dataFormatted)
  }

  insert(table: string, task: ITask) {
    // Check if data or table is empty
    if (!task || !table?.trim()) {
      return
    }

    const isArray = Array.isArray(this.#database[table])
    // if table exists, push data to it else create a new table
    if (isArray) {
      this.#database[table].push(task)
    } else {
      this.#database[table] = [task]
    }

    this.#persist()
    return task
  }

  patchCompleteTask(table: string, id: string) {
    const taskIndex = this.#database[table].findIndex((task) => task.id === id)

    if (taskIndex > -1) {
      const task = this.#database[table][taskIndex]

      const taskUpdated = {
        ...task,
        completed_at: task.completed_at ? null : new Date(),
      }

      this.#database[table][taskIndex] = taskUpdated
      this.#persist()
      return taskUpdated
    }
  }

  update(table: string, id: string, task: ITask) {
    const taskIndex = this.#database[table].findIndex((task) => task.id === id)

    if (taskIndex > -1) {
      this.#database[table][taskIndex] = task
      this.#persist()
      return task
    }
  }

  delete(table: string, id: string) {
    const isArray = Array.isArray(this.#database[table])

    if (isArray) {
      const taskIndex = this.#database[table].findIndex(
        (task) => task.id === id,
      )

      if (taskIndex > -1) {
        this.#database[table].splice(taskIndex, 1)
        this.#persist()
      } else {
        return { error: 'Task not found' }
      }
    }
  }
}
