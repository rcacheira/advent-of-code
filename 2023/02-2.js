const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('02.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let value = 0;

  for await (const line of rl) {
    const gameId = parseInt(/Game (\d+)/.exec(line)[1])
    const regs = [/((\d+) red)/g, /((\d+) green)/g, /((\d+) blue)/g]

    console.log(line)

    let power = 1;
    
    for(let i = 0; i<regs.length; i++){
      let minimun = 0
      while(true){
        const res = regs[i].exec(line)
        if(!res){
          break;
        }
        if(parseInt(res[2]) > minimun){
          console.log("saving a new minimum ", res[0], ">", minimun)
          minimun = parseInt(res[2]);
        }
      }

      power *= minimun
      console.log({gameId, minimun, power})
    }

    value += power
    console.log({gameId, power, value})
  }

  console.log({value})
}
example();