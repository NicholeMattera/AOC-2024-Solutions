import { readParseInput, sortUpdates } from './common.mjs'
;(async () => {
  const { pageOrderingRules, pagesToPrintInUpdates } = await readParseInput()
  const { incorrectlyOrderedUpdates } = sortUpdates(pagesToPrintInUpdates, pageOrderingRules)

  const result = incorrectlyOrderedUpdates.reduce((acc, pages) => {
    const sortedPages = pages.sort((x, y) => {
      const pageOrderingRule = pageOrderingRules[x]

      // If there is no ordering rule for the current page, there is no need to move it
      if (pageOrderingRule === undefined) {
        return 0
      }

      for (const page of pageOrderingRule.mustBeBefore) {
        // If the page that must be before the current page is found, move the current page to the end
        if (page === y) {
          return -1
        }
      }

      // If the current page is not found in the ordering rules, there is no need to move it
      return 0
    })

    // Sum the middle page number from thee sorted pages
    return acc + sortedPages[Math.floor(sortedPages.length / 2)]
  }, 0)

  console.log(result)
})()
