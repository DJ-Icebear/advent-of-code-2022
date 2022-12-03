import { readFile } from 'fs/promises'

const getStashTotal = (stash: string): number => {
  const foodItems = stash.trim().split('\n')

  const caloryTotal = foodItems.reduce((total, item) => total + parseInt(item), 0)
  return caloryTotal
}

const getSolution = (input: string): number => {
  const elfStashes = input.split('\n\n')

  const elfTotals = elfStashes.map((stash) => getStashTotal(stash))
  const maxTotal = Math.max(...elfTotals)
  return maxTotal
}

describe('Task 1', () => {
  it('returns expected number for example input', async () => {
    const input = await readFile('day-1/example.txt', 'binary')
    const maxTotal = getSolution(input)

    expect(maxTotal).toBe(24000)
  })

  it('returns expected response for file input', async () => {
    const input = await readFile('day-1/input1.txt', 'binary')
    const maxTotal = getSolution(input)

    expect(maxTotal).toBeGreaterThan(0)
    expect(maxTotal).toBe(71471)
  })
})
