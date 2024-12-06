import { readMap, walk } from './common.mjs'
;(async () => {
  const { obstructions, start, size } = await readMap()
  const { numberOfVisitedLocations } = walk(obstructions, start, size)
  console.log(numberOfVisitedLocations)
})()
