const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('04.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let value = 0;

  let copiesEarned = []

  for await (const line of rl) {
    const myNumbers = /:\s+([\d\s]+)\s+\|/g.exec(line)[1].replaceAll('  ', ' ').split(' ')
    const cardNumbers = /\|\s+([\d\s]+)/g.exec(line)[1].replaceAll('  ', ' ').split(' ')

    const winningNumbers = myNumbers.filter(number => cardNumbers.includes(number))

    const scratchboardCopies = 1 + (copiesEarned[0] || 0)
    
    //remove this card from copies earned
    copiesEarned.shift()

    // add next copies earned
    for(let i = 0; i < winningNumbers.length; i++){
      copiesEarned[i] = (copiesEarned[i] || 0) + scratchboardCopies
    }
    
    console.log({line, winningNumbers, scratchboardCopies})

    value += scratchboardCopies
  }

  console.log({value})
}
example();