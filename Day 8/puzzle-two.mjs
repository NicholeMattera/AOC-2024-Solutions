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

        antinodes[`${x1},${y1}`] = { x: x1, y: y1 }
        antinodes[`${x2},${y2}`] = { x: x2, y: y2 }

        const xd = x2 - x1
        const yd = y2 - y1

        let lastX = x1 - xd
        let lastY = y1 - yd
        while (lastX >= 0 && lastX < size.w && lastY >= 0 && lastY < size.h) {
          antinodes[`${lastX},${lastY}`] = { x: lastX, y: lastY }
          lastX -= xd
          lastY -= yd
        }

        lastX = x2 + xd
        lastY = y2 + yd
        while (lastX >= 0 && lastX < size.w && lastY >= 0 && lastY < size.h) {
          antinodes[`${lastX},${lastY}`] = { x: lastX, y: lastY }
          lastX += xd
          lastY += yd
        }
      })
    })
  }

  console.log(Object.keys(antinodes).length)
})()
