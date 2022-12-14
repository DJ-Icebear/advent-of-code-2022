import { readFile } from 'fs/promises'
import { CrateArray, getCrateArray, getTopCrates } from '.'

describe('Task 1', () => {
  it('returns correct string for example input', async () => {
    const input = await readFile('day-5/example.txt', 'binary')
    const [crateState, instructions] = input.split('\n\n')

    const crateArray = getCrateArray(crateState)
    const response = getResponse(crateArray, instructions)

    expect(response).toBe('CMZ')
  })

  it('returns correct string for input file', async () => {
    const input = await readFile('day-5/input.txt', 'binary')
    const [crateState, instructions] = input.split('\n\n')

    const crateArray = getCrateArray(crateState)
    const response = getResponse(crateArray, instructions)

    expect(response).toBe('WHTLRMZRC')
  })
})

describe('getResponseString', () => {
  it('returns string of top elements', () => {
    const input = [
      ['Z', 'M', 'P'],
      ['H', 'G'],
      ['D', 'F'],
    ]
    expect(getTopCrates(input)).toBe('PGF')
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

  for (let index = 0; index < numberOfCrates; index++) {
    const popped = crateArray[fromCrateNumber - 1].pop()
    popped && crateArray[toCrateNumber - 1].push(popped)
  }
}
