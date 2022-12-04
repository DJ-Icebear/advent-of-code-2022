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
  const opponentChoice = getChoiceValue(choices[0])
  const myChoice = getChoiceValue(choices[1])

  const resultPoints = getResult(opponentChoice, myChoice)
  return myChoice + resultPoints
}

enum Choice {
  ROCK = 1, // A, X,
  PAPER = 2, // B, Y
  SCISSORS = 3, // C, Z
}

const getChoiceValue = (letter: string): Choice => {
  switch (letter) {
    case 'X':
    case 'A':
      return Choice.ROCK
    case 'Y':
    case 'B':
      return Choice.PAPER
    case 'Z':
    case 'C':
      return Choice.SCISSORS
    default:
      throw 'Lizard/spock not allowed'
  }
}

const getResult = (opponentChoice: Choice, myChoice: Choice): number => {
  if (opponentChoice === myChoice) return 3 // Draw

  if (myChoice === Choice.ROCK && opponentChoice === Choice.SCISSORS) return 6
  if (myChoice === Choice.SCISSORS && opponentChoice === Choice.ROCK) return 0

  if (opponentChoice > myChoice) return 0 // I lost
  else return 6 // I won
}
