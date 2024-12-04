import fs from 'node:fs/promises'
;(async () => {
  const charactersByLine = (await fs.readFile('./input', 'utf8')).split('\n').map((line) => line.split(''))

  const findString = (x, y, string, directionX, directionY) => {
    for (let i = 0; i < string.length; i++) {
      // Check for out of bounds in the Y direction
      if (y + i * directionY < 0 || charactersByLine[y + i * directionY] === undefined) {
        return false
      }

      // Check for out of bounds in the X direction
      if (x + i * directionX < 0 || charactersByLine[y + i * directionY][x + i * directionX] === undefined) {
        return false
      }

      // Check if the character is not present
      if (charactersByLine[y + i * directionY][x + i * directionX] !== string[i]) {
        return false
      }
    }

    return true
  }

  let result = 0
  for (let y = 0; y < charactersByLine.length; y++) {
    for (let x = 0; x < charactersByLine[y].length; x++) {
      if (findString(x, y, 'XMAS', -1, 0)) {
        result++
      }

      if (findString(x, y, 'XMAS', 1, 0)) {
        result++
      }

      if (findString(x, y, 'XMAS', 0, -1)) {
        result++
      }

      if (findString(x, y, 'XMAS', 0, 1)) {
        result++
      }

      if (findString(x, y, 'XMAS', -1, -1)) {
        result++
      }

      if (findString(x, y, 'XMAS', 1, -1)) {
        result++
      }

      if (findString(x, y, 'XMAS', -1, 1)) {
        result++
      }

      if (findString(x, y, 'XMAS', 1, 1)) {
        result++
      }
    }
  }

  console.log(result)
})()
