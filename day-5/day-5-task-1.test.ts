import { readFile } from 'fs/promises'

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

    expect(response).toBe('MCD')
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

type CrateArray = Array<Array<string>>

const getResponse = (crateArray: CrateArray, instructions: string): string => {
  const instructionsArray = instructions.split('\n')

  instructionsArray.forEach((instruction) => moveCrates(crateArray, instruction))

  const response = getTopCrates(crateArray)
  return response
}

const getTopCrates = (crateArray: CrateArray): string => crateArray.reduce((acc, stack) => acc + stack.pop(), '')

const getCrateArray = (crateString: string): CrateArray => {
  const rows = crateString.split('\n').reverse()
  const numbersRow = rows.shift() as string

  const numberOfStacks = parseInt(numbersRow[numbersRow.length - 2] as string)
  const stacks: CrateArray = new Array(numberOfStacks).fill(0).map((_) => [])

  const rowLength = rows[0].length

  rows.forEach((row) => {
    for (
      let letterPosition = 1, currentStack = 0;
      letterPosition < rowLength;
      letterPosition = letterPosition + 4, currentStack++
    ) {
      const letter = row[letterPosition]
      if (letter !== ' ') stacks[currentStack].push(letter)
    }
  })
  return stacks
}

const moveCrates = (crateArray: CrateArray, instruction: string): void => {
  const array = instruction.split(' ')
  const [numberOfCrates, fromCrateNumber, toCrateNumber] = array
    .filter((word) => !isNaN(parseInt(word)))
    .map((item) => parseInt(item))

  console.log({ numberOfCrates, fromCrateNumber, toCrateNumber })
  const fromCrate = crateArray[fromCrateNumber - 1]
  console.log({ fromCrate })
  const crateToMove = fromCrate.splice(-numberOfCrates)
  console.log({ crateToMove })
  crateArray[toCrateNumber - 1] = crateArray[toCrateNumber - 1].concat(crateToMove)
  console.log({ crateArray })
  // for (let index = 0; index < numberOfCrates; index++) {
  //   const popped = crateArray[fromCrate - 1].pop()
  //   popped && crateArray[toCrate - 1].push(popped)
  // }
}
