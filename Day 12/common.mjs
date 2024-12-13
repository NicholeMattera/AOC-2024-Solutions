import fs from 'node:fs/promises'

export async function readMap(path = './input') {
  const input = await fs.readFile(path, 'utf8')
  return input
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split(''))
}
