import { readFile } from 'fs/promises'

const getStashTotal = (stash: string): number => {
  const foodItems = stash.split('\n')

  const caloryTotal = foodItems.reduce((total, item) => total + parseInt(item), 0)
  return caloryTotal
}

describe('Task 1', () => {
  it('returns expected response for example', async () => {
    const input = await readFile('day-1/example.txt', 'binary')
    const elfStashes = input.split('\n\n')

    const elfTotals = elfStashes.map((stash) => getStashTotal(stash))
    const maxTotal = Math.max(...elfTotals)

    expect(maxTotal).toBe(24000)
  })
})
