import { findTrailheads, readInput } from './common.mjs'

function walkTrailToFindEnds(map, position) {
  const currentPosition = map[position.y][position.x]
  let endPositions = {}
  if (currentPosition === 9) {
    endPositions[`${position.x},${position.y}`] = position
    return endPositions
  }

  // See if we can walk up
  if (position.y - 1 >= 0 && map[position.y - 1][position.x] === currentPosition + 1) {
    endPositions = {
      ...endPositions,
      ...walkTrailToFindEnds(map, { x: position.x, y: position.y - 1 }),
    }
  }

  // See if we can walk down
  if (position.y + 1 < map.length && map[position.y + 1][position.x] === currentPosition + 1) {
    endPositions = {
      ...endPositions,
      ...walkTrailToFindEnds(map, { x: position.x, y: position.y + 1 }),
    }
  }

  // See if we can walk left
  if (position.x - 1 >= 0 && map[position.y][position.x - 1] === currentPosition + 1) {
    endPositions = {
      ...endPositions,
      ...walkTrailToFindEnds(map, { x: position.x - 1, y: position.y }),
    }
  }

  // See if we can walk right
  if (position.x + 1 < map[position.y].length && map[position.y][position.x + 1] === currentPosition + 1) {
    endPositions = {
      ...endPositions,
      ...walkTrailToFindEnds(map, { x: position.x + 1, y: position.y }),
    }
  }

  return endPositions
}

;(async () => {
  const map = await readInput()
  const trailheads = findTrailheads(map)

  let overallScores = 0
  for (const trailhead of trailheads) {
    const endPositions = walkTrailToFindEnds(map, trailhead)
    overallScores += Object.keys(endPositions).length
  }

  console.log(overallScores)
})()
