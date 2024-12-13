import { readMap } from './common.mjs'

function findAreaAndPerimeter(map, state, size, x, y) {
  if (state[y][x] === 1) {
    return { area: 0, perimeter: 0 }
  }
  state[y][x] = 1

  let area = 1
  let perimeter = 4

  if (x + 1 < size.w && map[y][x] === map[y][x + 1]) {
    perimeter--

    const right = findAreaAndPerimeter(map, state, size, x + 1, y)
    area += right.area
    perimeter += right.perimeter
  }

  if (x - 1 >= 0 && map[y][x] === map[y][x - 1]) {
    perimeter--

    const left = findAreaAndPerimeter(map, state, size, x - 1, y)
    area += left.area
    perimeter += left.perimeter
  }

  if (y + 1 < size.h && map[y][x] === map[y + 1][x]) {
    perimeter--

    const bottom = findAreaAndPerimeter(map, state, size, x, y + 1)
    area += bottom.area
    perimeter += bottom.perimeter
  }

  if (y - 1 >= 0 && map[y][x] === map[y - 1][x]) {
    perimeter--

    const top = findAreaAndPerimeter(map, state, size, x, y - 1)
    area += top.area
    perimeter += top.perimeter
  }

  return { area, perimeter }
}

;(async () => {
  const map = await readMap()
  const size = {
    w: map[0].length,
    h: map.length,
  }
  const state = new Array(size.h).fill(0).map(() => new Array(size.w).fill(0))

  let price = 0
  for (let y = 0; y < size.h; y++) {
    for (let x = 0; x < size.w; x++) {
      const { area, perimeter } = findAreaAndPerimeter(map, state, size, x, y)

      if (area !== 0 && perimeter !== 0) {
        price += area * perimeter
      }
    }
  }

  console.log(price)
})()
