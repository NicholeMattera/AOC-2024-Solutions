import { findTrailheads, readInput } from './common.mjs'

function walkTrailToFindForks(map, position) {
  const currentPosition = map[position.y][position.x]
  if (currentPosition === 9) {
    return 0
  }

  let forks = -1
  let subForks = 0

  // See if we can walk up
  if (position.y - 1 >= 0 && map[position.y - 1][position.x] === currentPosition + 1) {
    subForks += walkTrailToFindForks(map, { x: position.x, y: position.y - 1 })
    forks++
  }

  // See if we can walk down
  if (position.y + 1 < map.length && map[position.y + 1][position.x] === currentPosition + 1) {
    subForks += walkTrailToFindForks(map, { x: position.x, y: position.y + 1 })
    forks++
  }

  // See if we can walk left
  if (position.x - 1 >= 0 && map[position.y][position.x - 1] === currentPosition + 1) {
    subForks += walkTrailToFindForks(map, { x: position.x - 1, y: position.y })
    forks++
  }

  // See if we can walk right
  if (position.x + 1 < map[position.y].length && map[position.y][position.x + 1] === currentPosition + 1) {
    subForks += walkTrailToFindForks(map, { x: position.x + 1, y: position.y })
    forks++
  }

  return forks + subForks
}

;(async () => {
  const map = await readInput()
  const trailheads = findTrailheads(map)

  let overallScores = 0
  for (const trailhead of trailheads) {
    const score = walkTrailToFindForks(map, trailhead)
    overallScores += score + 1
  }

  console.log(overallScores)
})()
