const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('04.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let value = 0;

  for await (const line of rl) {
    const myNumbers = /:\s+([\d\s]+)\s+\|/g.exec(line)[1].replaceAll('  ', ' ').split(' ')
    const cardNumbers = /\|\s+([\d\s]+)/g.exec(line)[1].replaceAll('  ', ' ').split(' ')

    const winningNumbers = myNumbers.filter(number => cardNumbers.includes(number))

    const scratchboardPoints = (winningNumbers.length > 0 ? 1 : 0) * Math.pow(2, winningNumbers.length-1)
    
    console.log({line, winningNumbers, scratchboardPoints})

    value += scratchboardPoints
  }

  console.log({value})
}
example();