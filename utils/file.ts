import { readFile } from 'fs/promises'

export const fileLinesToArray = async (absolutePath: string): Promise<Array<string>> => {
  const input = await readFile(absolutePath, 'binary')
  return input.trim().split('\n')
}
