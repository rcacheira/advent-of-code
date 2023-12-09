const { Console } = require('console');
const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('08.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let dirs
  let nextDir
  let curr

  const options = {}

  for await (const line of rl) {
    const dirRegx = /^[RL]+$/
    const lineRegx = /^([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)$/

    if(lineRegx.test(line)){
      [all, pos, L, R] = lineRegx.exec(line)
      if(pos === 'AAA'){
        curr = {pos, L, R}
      }

      options[pos] = {pos, L, R}
    }

    if(dirRegx.test(line)){
      dirs = {}
      let last = line.split('').reduce((previous, current) => {
        const next = {dir: current}
        previous.next = next
        return next
      }, dirs)

      // forget the first
      dirs = dirs.next
      // create the circular reference
      last.next = dirs

      // set the next dir
      nextDir = dirs
    }
  }

  steps = 1;

  console.log({options})

  console.log({curr, nextDir, next: curr[nextDir.dir]})

  while(curr[nextDir.dir] !== 'ZZZ') {
    curr = options[curr[nextDir.dir]]
    nextDir = nextDir.next
    steps++
  }

  console.log({steps})

}
example();