import fs from 'node:fs/promises'

export async function readParseInput() {
  const input = await fs.readFile('./input', 'utf8')
  const lines = input.split('\n')

  const pageOrderingRules = {}
  const pagesToPrintInUpdates = []
  for (const line of lines) {
    if (line.includes('|')) {
      const [x, y] = line.split('|').map((num) => parseInt(num, 10))

      if (pageOrderingRules[x] === undefined) {
        pageOrderingRules[x] = {
          mustBeBefore: [y],
        }
      } else {
        pageOrderingRules[x].mustBeBefore.push(y)
      }
    } else if (line.includes(',')) {
      const pages = line.split(',').map((num) => parseInt(num, 10))
      pagesToPrintInUpdates.push(pages)
    }
  }

  return { pageOrderingRules, pagesToPrintInUpdates }
}

export function sortUpdates(pagesToPrintInUpdates, pageOrderingRules) {
  let correctlyOrderedUpdates = []
  let incorrectlyOrderedUpdates = []

  for (const pages of pagesToPrintInUpdates) {
    // Has to be an odd number of pages to get the middle page number
    if (pages.length % 2 === 0) {
      continue
    }

    let isCorrectlyOrdered = true
    for (let i = 0; i < pages.length; i++) {
      const pageOrderingRule = pageOrderingRules[pages[i]]

      // If there is no ordering rule for the current page, skip it
      if (pageOrderingRule === undefined) {
        continue
      }

      // Loop through the pages that must be before the current page
      for (let j = 0; j < pageOrderingRule.mustBeBefore.length; j++) {
        const rulePageIndex = pages.findIndex((page) => page === pageOrderingRule.mustBeBefore[j])

        // If the page that must be before the current page is not found, or is found after the current page, break out of the loop
        if (rulePageIndex !== -1 && i > rulePageIndex) {
          isCorrectlyOrdered = false
          break
        }
      }

      // Break out of the loop if the pages are not correctly ordered
      if (!isCorrectlyOrdered) {
        break
      }
    }

    if (isCorrectlyOrdered) {
      correctlyOrderedUpdates.push(pages)
    } else {
      incorrectlyOrderedUpdates.push(pages)
    }
  }

  return { correctlyOrderedUpdates, incorrectlyOrderedUpdates }
}
