const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('09.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let sum = 0;

  for await (const line of rl) {
    let numbers = line.split(' ').map(value => parseInt(value))

    let firsts = []

    while(true){
      console.log({numbers})

      let nonZeroDiffSafe = 0

      numbers.reduce((previous, current) => {
        if(previous === undefined) {
          numbers = []
          firsts.push(current)
        } else {
          const diff = current-previous
          nonZeroDiffSafe = nonZeroDiffSafe || diff
          numbers.push(diff)
        }
        return current
      }, undefined)

      if(!nonZeroDiffSafe) break;
    }

    let prediction = firsts.reduceRight((previous, current) => current-previous, 0)

    console.log({prediction})

    sum += prediction
  }

  console.log({sum})
}
example();