const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('01.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let value = 0;

  for await (const line of rl) {
    const firstDigit = line.match(/(\d){1}.*$/)[1].replace('one', 1).replace('two', 2).replace('three', 3).replace('four', 4).replace('five', 5).replace('six', 6).replace('seven', 7).replace('eight', 8).replace('nine', 9)
    const lastDigit = line.match(/^.*(\d){1}/)[1].replace('one', 1).replace('two', 2).replace('three', 3).replace('four', 4).replace('five', 5).replace('six', 6).replace('seven', 7).replace('eight', 8).replace('nine', 9)
    value += parseInt(`${firstDigit}${lastDigit}`)
  }

  console.log({value})
}
example();