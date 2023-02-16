const POKEMON_COUNT = 151;

const cardHTML = `
    <div class="card" id="card-{id}"><!-- card -->
    <div class="title">
    <h2>{name}</h2>
    <small># {id}</small>
    </div>
    <div class="img bg-{type}">
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/{id}.png" alt="{name}" />
    </div>
    <div class="type {type}">
    <p>{type}</p>
    </div>
    <button class="favorite" data-id={id}>
    <div class="heart">
    </div>
    </button>
    </div><!-- /card -->
`;

const cards = document.querySelector(".cards");

const fetchPokemon = async (number) => {
  if (number === undefined) return;
  const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
  const response = await fetch(url).then((response) => response.json());
  const { id, name, types } = response;
  const type = types[0].type.name;

  return { id, name, type };
};

const fetchPokemons = async () => {
  for (let i = 1; i <= POKEMON_COUNT; i++) {
    const pokemon = await fetchPokemon(i);
    createPokemonCard(pokemon);
  }
};

const replacer = (text, source, destination) => {
  const regex = new RegExp(source, "gi");
  return text.replace(regex, destination);
};

const createPokemonCard = (pokemon) => {
  const { id, name, type } = pokemon;

  newID = addZeroes(id, 3);

  let newCard = replacer(cardHTML, `\{id\}`, newID);
  newCard = replacer(newCard, `\{name\}`, name);
  newCard = replacer(newCard, `\{type\}`, type);

  cards.innerHTML += newCard;
};

function addZeroes(num, len) {
  var numberWithZeroes = String(num);
  var counter = numberWithZeroes.length;

  while (counter < len) {
    numberWithZeroes = "0" + numberWithZeroes;

    counter++;
  }
  return numberWithZeroes;
}

fetchPokemons();
