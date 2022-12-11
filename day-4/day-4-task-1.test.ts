import { readFile } from 'fs/promises'

describe('Task 1', () => {
  it('returns correct score for example input', async () => {
    const input = await readFile('day-4/example.txt', 'binary')
    const elfPairs = input.split('\n')

    const totalOverlappingPairs = elfPairs.reduce((overlappingCount, pairString) => {
      const pairs = pairString.split(',')

      const isOverlapping = checkOverlap(pairs)
      return isOverlapping ? overlappingCount + 1 : overlappingCount
    }, 0)

    expect(totalOverlappingPairs).toBe(2)
  })

  it('checkOverlap works', async () => {
    expect(checkOverlap(['2-4', '6-8'])).toBe(false)
    expect(checkOverlap(['2-3', '4-5'])).toBe(false)
    expect(checkOverlap(['2-8', '3-7'])).toBe(true)
    expect(checkOverlap(['6-6', '4-6'])).toBe(true)
  })
})

const checkOverlap = (pairs: string[]): boolean => {
  const firstPair = pairs[0].split('-')
  const secondPair = pairs[1].split('-')
  const firstPairLow = parseInt(firstPair[0])
  const firstPairHigh = parseInt(firstPair[1])
  const secondPairLow = parseInt(secondPair[0])
  const secondPairHigh = parseInt(secondPair[1])

  // If the sign (plus or minus) when summing the largest number section
  // is different from the sign of the sum of the lowest number section
  // there is a complete overlap of one section over the other
  const topSign = Math.sign(secondPairHigh - firstPairHigh)
  const bottomSign = Math.sign(secondPairLow - firstPairLow)

  if (topSign !== bottomSign) return true
  else return false
}
