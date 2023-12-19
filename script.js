const axios = require('axios')
const fs=require('fs/promises')

async function loopThroughPokemon(pokemonArray,startIndex){
  console.log(`commencing for starting index ${startIndex}`)
  if (pokemonArray.length<=startIndex) {
    console.log('compilation complete!')
    return
  }
  sample=pokemonArray.slice(startIndex,startIndex+25)
  console.log(sample)
  console.log('requesting...')
  data= await Promise.all(sample.map((pokemon,i)=>axios.get(`https://pokeapi.co/api/v2/pokemon/${i+1+startIndex-1017+10001}`)))
  console.log('reading...')
  fs.readFile(`${__dirname}/pokemonDB.json`,'utf-8')
    .then(file=>{
      parsedFile=JSON.parse(file)
      console.log('processing new data...')
      data.map(entry=>entry.data).forEach((pokemon,i)=>{
        delete pokemon.game_indices
        delete pokemon.held_items
        pokemon.moves.forEach(move=>{
          move.version_group_details=move.version_group_details[-1]
        })
        parsedFile.pokemon.push(pokemon)
      })
      console.log('writing...')
      return fs.writeFile(`${__dirname}/pokemonDB.json`,JSON.stringify(parsedFile),'utf-8')
    }).then(()=>{
      console.log('wait 30 seconds to allow server to relax :)')
      setTimeout(()=>loopThroughPokemon(pokemonArray,startIndex+4),30000)
    }).catch(()=>{
      console.log('error, rejected by server. Trying again in 60 seconds...')
      setTimeout(()=>loopThroughPokemon(pokemonArray,startIndex),60000)
    })
}

axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000')
  .then(res=>res.data.results.map(pokemon=>pokemon.url))
  .then(pokemon=>{
    return loopThroughPokemon(pokemon,0)
  })