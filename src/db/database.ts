import fs from 'node:fs/promises'

import { ITask } from '../entities/task'

const databasePath = new URL('../db/db.json', import.meta.url)

type IDatabase = {
  [key: string]: ITask[]
}

export class Database {
  #database: IDatabase = {}

  select(table: string) {
    const data: ITask[] = this.#database[table] ?? []

    return data
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
}
