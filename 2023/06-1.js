const { Console } = require('console');
const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('06.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let margin = 1;

  let times;

  for await (const line of rl) {
    const values = /^[a-zA-Z]+:\s+([\d\s]+)$/.exec(line)[1].split(' ').filter(value => value !== ' ' && value !== '').map(value => parseInt(value))

    if(!times) {
      times = values
      continue;
    }

    values.forEach((value, index) => {
      const time = times[index]
      let waysToBeatTheRecord = 0;

      for(let i = 0; i < time; i++){
        const distance = (time-i)*i
        if(distance > value /** record */) {
          waysToBeatTheRecord += 1
        }
      }

      margin *= waysToBeatTheRecord
    })
  }

  console.log({margin})
}
example();