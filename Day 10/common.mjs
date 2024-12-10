import fs from 'node:fs/promises'

export function findTrailheads(map) {
  const trailheads = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        trailheads.push({ x, y })
      }
    }
  }

  return trailheads
}

export async function readInput() {
  const input = await fs.readFile('./input', 'utf8')
  const lines = input.split('\n').filter(Boolean)

  const map = []
  for (const line of lines) {
    map.push(line.split('').map(Number))
  }

  return map
}
