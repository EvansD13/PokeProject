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
  //data= await Promise.all(sample.map((move,i)=>axios.get(`https://pokeapi.co/api/v2/move/${i+1+startIndex}`)))
  data= await Promise.all(sample.map((pokemon,i)=>axios.get(`https://pokeapi.co/api/v2/pokemon/${i+1+startIndex}`)))
  console.log('reading...')
  startIndex += 25

  fs.readFile(`${__dirname}/pokeDB.json`,'utf-8')
    .then(file=>{
      parsedFile=JSON.parse(file)
      console.log('processing new data...')
      data.map(entry=>entry.data).forEach((pokemon,i)=>{
        delete pokemon.abilities
        delete pokemon.base_experience
        delete pokemon.forms
        delete pokemon.game_indices
        delete pokemon.height
        delete pokemon.held_items
        delete pokemon.is_default
        delete pokemon.location_area_encounters
        delete pokemon.order
        delete pokemon.past_abilities
        delete pokemon.past_types
        delete pokemon.species
        delete pokemon.sprites
        delete pokemon.stats
        delete pokemon.types
        delete pokemon.weight

        
        parsedFile.pokemon.push(pokemon)
      })
      console.log('writing...')
      return fs.writeFile(`${__dirname}/pokeDB.json`,JSON.stringify(parsedFile),'utf-8')
    }).then(()=>{
      console.log('wait 30 seconds to allow server to relax :)')
      //setTimeout(()=>loopThroughPokemon(moveArray,startIndex+25),30000)
      setTimeout(()=>loopThroughPokemon(pokemonArray,startIndex+25),30000)
    }).catch(()=>{
      console.log('error, rejected by server. Trying again in 60 seconds...')
      setTimeout(()=>loopThroughPokemon(pokemonArray,startIndex),60000)
    })
}

axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1219')
  .then(res=>res.data.results.map(pokemon=>pokemon.url))
  .then(pokemon=>{
    return loopThroughPokemon(pokemon,0)
  })