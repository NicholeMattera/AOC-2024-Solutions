import fs from 'node:fs/promises'

export async function readInput() {
  const input = await fs.readFile('./input', 'utf8')
  const lines = input.split('\n').filter(Boolean)

  const antennas = {}
  const size = { w: lines[0].length, h: lines.length }
  for (let y = 0; y < size.h; y++) {
    for (let x = 0; x < size.w; x++) {
      if (lines[y][x] !== '.') {
        if (!antennas[lines[y][x]]) {
          antennas[lines[y][x]] = []
        }
        antennas[lines[y][x]].push({ x, y })
      }
    }
  }

  return { antennas, size }
}
