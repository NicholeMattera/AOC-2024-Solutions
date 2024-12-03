import { readParseAndSortInput } from './common.mjs'
;(async () => {
  const { leftNumbers, rightNumbers } = await readParseAndSortInput()

  // Calculate the distance
  let distance = 0
  for (let i = 0; i < leftNumbers.length; i++) {
    distance += Math.abs(leftNumbers[i] - rightNumbers[i])
  }

  console.log(distance)
})()
