import fs from 'node:fs/promises'

export async function readMap() {
  const input = await fs.readFile('./input', 'utf8')
  const lines = input.split('\n')

  const obstructions = {}
  const start = {}
  const size = {
    w: lines[0].length,
    h: lines.length,
  }
  for (let y = 0; y < size.h; y++) {
    if (lines[y].length < size.w) {
      continue
    }

    for (let x = 0; x < size.w; x++) {
      if (lines[y][x] === '#') {
        obstructions[`${x},${y}`] = true
      } else if (lines[y][x] === '^') {
        start.x = x
        start.y = y
      }
    }
  }

  return { obstructions, start, size }
}

export function walk(obstructions, start, size) {
  const position = {
    ...start,
  }
  const uniqueVisits = {}
  const visited = {}
  let direction = 'up'
  while (position.x >= 0 && position.x < size.w - 1 && position.y >= 0 && position.y < size.h - 1) {
    if (uniqueVisits[`${position.x},${position.y},${direction}`]) {
      return { numberOfVisitedLocations: Object.keys(visited).length, looped: true }
    }
    uniqueVisits[`${position.x},${position.y},${direction}`] = true
    visited[`${position.x},${position.y}`] = true

    if (direction === 'up' && obstructions[`${position.x},${position.y - 1}`]) {
      direction = 'right'
    } else if (direction === 'down' && obstructions[`${position.x},${position.y + 1}`]) {
      direction = 'left'
    } else if (direction === 'left' && obstructions[`${position.x - 1},${position.y}`]) {
      direction = 'up'
    } else if (direction === 'right' && obstructions[`${position.x + 1},${position.y}`]) {
      direction = 'down'
    } else if (direction === 'up') {
      position.y--
    } else if (direction === 'down') {
      position.y++
    } else if (direction === 'left') {
      position.x--
    } else if (direction === 'right') {
      position.x++
    }
  }

  return { numberOfVisitedLocations: Object.keys(visited).length, looped: false }
}
