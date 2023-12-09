const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('05.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let seedRanges = []

  let categories = [];

  let currentCategorie;

  for await (const line of rl) {
    const seedsRegx = /^[a-z]+:\s([\d\s]+)$/
    const titleRegx = /^([a-z]+)-to-([a-z]+) map:$/
    const valuesRegx = /^([\d\s]+)$/

    if(line.match(valuesRegx)){
      const [destination, source, length] = valuesRegx.exec(line)[1].split(' ')
      const map = {
        initial: parseInt(source),
        final: parseInt(source)+parseInt(length)-1,
        match: destination-source
      }

      currentCategorie.maps.push(map)

      continue;
    }

    if(line.match(titleRegx)){
      const res = titleRegx.exec(line)
      currentCategorie = {from: res[1], to: res[2], maps:[]}
      categories.push(currentCategorie)
      continue;
    }

    if(line.match(seedsRegx)){
      seedRanges = seedsRegx.exec(line)[1].split(' ')
      // because of heap overflow, need to tackle seeds after categories
      continue;
    }
  }

  let lower = null;

  for(let i = 0; i<seedRanges.length; i += 2){
    // console.log({i, i1: i+1})
    for(let seed = parseInt(seedRanges[i]); seed < parseInt(seedRanges[i])+parseInt(seedRanges[i+1]); seed += 1) {
      let value = seed;
      categories.forEach(category => {
        // console.log({category})
        for(const map of category.maps){
          // console.log({map})
          if(value >= map.initial && value <= map.final){
            value = value + map.match
            break;
          }
        }
      })

      lower = lower === null ? value : Math.min(lower, value)

      // console.log({lower})
    }
  }

  console.log({lower})
}
example();