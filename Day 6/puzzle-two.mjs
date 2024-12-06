import { readMap, walk } from './common.mjs'
;(async () => {
  const { obstructions, start, size } = await readMap()

  let loops = 0
  for (let x = 0; x < size.w; x++) {
    for (let y = 0; y < size.h; y++) {
      if (obstructions[`${x},${y}`]) {
        continue
      }

      const tempObstructions = {
        ...obstructions,
        [`${x},${y}`]: true,
      }
      const { looped } = walk(tempObstructions, start, size)
      if (looped) {
        loops++
      }
    }
  }

  console.log(loops)
})()
