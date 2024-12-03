import { readParseAndSortInput } from './common.mjs'
;(async () => {
  const { leftNumbers, rightNumbers } = await readParseAndSortInput()

  // Calculate the similarity score
  let similarityScore = 0
  let rightIndex = 0
  for (let i = 0; i < leftNumbers.length; i++) {
    let appearances = 0

    for (let j = rightIndex; j < rightNumbers.length; j++) {
      if (leftNumbers[i] === rightNumbers[j]) {
        appearances++
      }

      if (rightNumbers[j] > leftNumbers[i]) {
        rightIndex = j
        break
      }
    }

    similarityScore += leftNumbers[i] * appearances
  }

  console.log(similarityScore)
})()
