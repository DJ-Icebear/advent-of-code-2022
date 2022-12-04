export enum Choice {
  ROCK = 1, // A, X,
  PAPER = 2, // B, Y
  SCISSORS = 3, // C, Z
}

export const choiceValue = {
  X: Choice.ROCK,
  A: Choice.ROCK,
  Y: Choice.PAPER,
  B: Choice.PAPER,
  Z: Choice.SCISSORS,
  C: Choice.SCISSORS,
}

export const getResult = (opponentChoice: Choice, myChoice: Choice): number => {
  if (opponentChoice === myChoice) return 3 // Draw

  if (myChoice === whatBeats(opponentChoice)) return 6
  if (whatBeats(myChoice) === opponentChoice) return 0

  throw 'non-expected result'
}

export const whatBeats = (choice: Choice): Choice => {
  if (choice === Choice.PAPER) return Choice.SCISSORS
  if (choice === Choice.SCISSORS) return Choice.ROCK
  if (choice === Choice.ROCK) return Choice.PAPER

  throw 'lizards'
}
