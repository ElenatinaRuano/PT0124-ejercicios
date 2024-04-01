export const data = async() => {

    let data = await fetch(`https://rickandmortyapi.com/api/character/`).then((res) => res.json());

    return data.results;
}