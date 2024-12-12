import { applyBlinkRules, readInput } from './common.mjs'
;(async () => {
  let stones = await readInput()

  for (let i = 0; i < 25; i++) {
    const newStones = []
    for (const stone of stones) {
      newStones.push(...applyBlinkRules(stone))
    }
    stones = newStones
  }

  console.log(stones.length)
})()
