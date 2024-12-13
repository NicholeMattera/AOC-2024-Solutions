import { readMap } from './common.mjs'

function findAreaAndEdges(map, state, size, x, y) {
  // If we have already visited this cell, then return 0
  if (state[y][x] === 1) {
    return { area: 0, edges: [] }
  }
  state[y][x] = 1

  let area = 1
  let matches = 4
  const edges = []

  if (x + 1 < size.w && map[y][x] === map[y][x + 1]) {
    matches--

    const right = findAreaAndEdges(map, state, size, x + 1, y)
    area += right.area
    edges.push(...right.edges)
  }

  if (x - 1 >= 0 && map[y][x] === map[y][x - 1]) {
    matches--

    const left = findAreaAndEdges(map, state, size, x - 1, y)
    area += left.area
    edges.push(...left.edges)
  }

  if (y + 1 < size.h && map[y][x] === map[y + 1][x]) {
    matches--

    const bottom = findAreaAndEdges(map, state, size, x, y + 1)
    area += bottom.area
    edges.push(...bottom.edges)
  }

  if (y - 1 >= 0 && map[y][x] === map[y - 1][x]) {
    matches--

    const top = findAreaAndEdges(map, state, size, x, y - 1)
    area += top.area
    edges.push(...top.edges)
  }

  // If there is at least one side that didn't match then this is an edge
  if (matches !== 0) {
    edges.push({ x, y })
  }

  return { area, edges }
}

function getNumberOfSidesFromEdges(map, size, edges) {
  // If there is only one edge, then it is a square
  if (edges.length === 1) {
    return 4
  }

  let sides = 0

  // Create a map of edges by X and Y
  const edgeXMap = {}
  const edgeYMap = {}
  for (const { x, y } of edges) {
    if (edgeXMap[x] === undefined) {
      edgeXMap[x] = []
    }
    edgeXMap[x].push({ x, y })

    if (edgeYMap[y] === undefined) {
      edgeYMap[y] = []
    }
    edgeYMap[y].push({ x, y })
  }

  // Figure out how many continuous left and right sides there are
  for (const key in edgeXMap) {
    edgeXMap[key].sort((a, b) => a.y - b.y)
    let lastY = { left: undefined, right: undefined }

    for (const { x, y } of edgeXMap[key]) {
      if (x - 1 < 0 || map[y][x] !== map[y][x - 1]) {
        if (lastY.left === undefined || lastY.left !== y - 1) {
          sides++
        }

        lastY.left = y
      }

      if (x + 1 >= size.w || map[y][x] !== map[y][x + 1]) {
        if (lastY.right === undefined || lastY.right !== y - 1) {
          sides++
        }

        lastY.right = y
      }
    }
  }

  // Figure out how many continuous top and bottom sides there are
  for (const key in edgeYMap) {
    edgeYMap[key].sort((a, b) => a.x - b.x)
    let lastX = { top: undefined, bottom: undefined }

    for (const { x, y } of edgeYMap[key]) {
      if (y - 1 < 0 || map[y][x] !== map[y - 1][x]) {
        if (lastX.top === undefined || lastX.top !== x - 1) {
          sides++
        }

        lastX.top = x
      }

      if (y + 1 >= size.h || map[y][x] !== map[y + 1][x]) {
        if (lastX.bottom === undefined || lastX.bottom !== x - 1) {
          sides++
        }

        lastX.bottom = x
      }
    }
  }

  return sides
}

;(async () => {
  const map = await readMap('./input')
  const size = {
    w: map[0].length,
    h: map.length,
  }
  const state = new Array(size.h).fill(0).map(() => new Array(size.w).fill(0))

  let price = 0
  for (let y = 0; y < size.h; y++) {
    for (let x = 0; x < size.w; x++) {
      const { area, edges } = findAreaAndEdges(map, state, size, x, y)

      if (area !== 0) {
        price += area * getNumberOfSidesFromEdges(map, size, edges)
      }
    }
  }

  console.log(price)
})()
