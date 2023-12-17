

async function ping(){
    const { results } = await (
        await fetch(
            `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
            )
          ).json();

}