import { readFile } from 'fs/promises'
import { getCrateArray, getTopCrates, CrateArray } from '.'

describe('Task 2', () => {
  it('returns correct string for example input', async () => {
    const input = await readFile('day-5/example.txt', 'binary')
    const [crateState, instructions] = input.split('\n\n')

    const crateArray = getCrateArray(crateState)
    const response = getResponse(crateArray, instructions)

    expect(response).toBe('MCD')
  })

  it('returns correct string for example input', async () => {
    const input = await readFile('day-5/input.txt', 'binary')
    const [crateState, instructions] = input.trim().split('\n\n')

    const crateArray = getCrateArray(crateState)
    const response = getResponse(crateArray, instructions)

    expect(response).toBe('GMPMLWNMG')
  })
})

describe('moveCrates', () => {
  it('moves the crates', () => {
    const input = [
      ['Z', 'M', 'P'],
      ['H', 'G'],
      ['D', 'F'],
    ]
    const instruction = 'move 2 from 1 to 3'
    const output = [['Z'], ['H', 'G'], ['D', 'F', 'P', 'M']]

    moveCrates(input, instruction)
    expect(input).toEqual(output)
  })
})

const getResponse = (crateArray: CrateArray, instructions: string): string => {
  const instructionsArray = instructions.split('\n')

  instructionsArray.forEach((instruction) => moveCrates(crateArray, instruction))

  const response = getTopCrates(crateArray)
  return response
}

const moveCrates = (crateArray: CrateArray, instruction: string): void => {
  const array = instruction.split(' ')
  const [numberOfCrates, fromCrateNumber, toCrateNumber] = array
    .filter((word) => !isNaN(parseInt(word)))
    .map((item) => parseInt(item))

  const fromCrate = crateArray[fromCrateNumber - 1]
  const crateToMove = fromCrate.splice(-numberOfCrates)
  crateArray[toCrateNumber - 1] = crateArray[toCrateNumber - 1].concat(crateToMove)
}
