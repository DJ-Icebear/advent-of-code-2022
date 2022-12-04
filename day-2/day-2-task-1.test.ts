import { readFile } from 'fs/promises'

describe('Task 1', () => {
  it('returns correct score for example input', async () => {
    const input = await readFile('day-2/example.txt', 'binary')

    const rounds = input.split('\n')

    const totalScore = rounds.reduce((sum, round) => {
      const score = getRoundScore(round)
      return sum + score
    }, 0)

    expect(totalScore).toBe(15)
  })

  it('returns correct score for input file', async () => {
    const input = await readFile('day-2/input.txt', 'binary')

    const rounds = input.trim().split('\n')

    const totalScore = rounds.reduce((sum, round) => {
      const score = getRoundScore(round)
      return sum + score
    }, 0)

    expect(totalScore).toBe(13484)
  })
})

const getRoundScore = (round: string): number => {
  const choices = round.split(' ')
  const opponentChoice = choiceValue[choices[0]]
  const myChoice = choiceValue[choices[1]]

  const resultPoints = getResult(opponentChoice, myChoice)
  return myChoice + resultPoints
}

enum Choice {
  ROCK = 1, // A, X,
  PAPER = 2, // B, Y
  SCISSORS = 3, // C, Z
}

const choiceValue = {
  X: Choice.ROCK,
  A: Choice.ROCK,
  Y: Choice.PAPER,
  B: Choice.PAPER,
  Z: Choice.SCISSORS,
  C: Choice.SCISSORS,
}

const getResult = (opponentChoice: Choice, myChoice: Choice): number => {
  if (opponentChoice === myChoice) return 3 // Draw

  if (myChoice === Choice.ROCK && opponentChoice === Choice.SCISSORS) return 6
  if (myChoice === Choice.SCISSORS && opponentChoice === Choice.ROCK) return 0

  if (opponentChoice > myChoice) return 0 // I lost
  else return 6 // I won
}
