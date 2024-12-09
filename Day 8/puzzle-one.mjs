import { readInput } from './common.mjs'
;(async () => {
  const { antennas, size } = await readInput()

  const antinodes = {}
  for (const frequency in antennas) {
    antennas[frequency].forEach(({ x: x1, y: y1 }) => {
      antennas[frequency].forEach(({ x: x2, y: y2 }) => {
        if (x1 === x2 && y1 === y2) {
          return
        }

        const xd = x2 - x1
        const yd = y2 - y1

        const antinodeOne = { x: x1 - xd, y: y1 - yd }
        if (antinodeOne.x >= 0 && antinodeOne.x < size.w && antinodeOne.y >= 0 && antinodeOne.y < size.h) {
          antinodes[`${antinodeOne.x},${antinodeOne.y}`] = antinodeOne
        }

        const antinodeTwo = { x: x2 + xd, y: y2 + yd }
        if (antinodeTwo.x >= 0 && antinodeTwo.x < size.w && antinodeTwo.y >= 0 && antinodeTwo.y < size.h) {
          antinodes[`${antinodeTwo.x},${antinodeTwo.y}`] = antinodeTwo
        }
      })
    })
  }

  console.log(Object.keys(antinodes).length)
})()
