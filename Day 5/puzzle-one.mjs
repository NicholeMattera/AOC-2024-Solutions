import { readParseInput, sortUpdates } from './common.mjs'
;(async () => {
  const { pageOrderingRules, pagesToPrintInUpdates } = await readParseInput()
  const { correctlyOrderedUpdates } = sortUpdates(pagesToPrintInUpdates, pageOrderingRules)

  const result = correctlyOrderedUpdates.reduce((acc, pages) => {
    return acc + pages[Math.floor(pages.length / 2)]
  }, 0)

  console.log(result)
})()
