const pokemonsApi = [
  {
    id: 1,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      measurementUnit: 'kg',
      value: '2.5',
    },
  },
  {
    id: 2,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      measurementUnit: 'kg',
      value: '2.5',
    },
  },
  {
    id: 3,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      measurementUnit: 'kg',
      value: '2.5',
    },
  },
  {
    id: 4,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: {
      measurementUnit: 'kg',
      value: '2.5',
    },
  },
  {
    id: 5,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: {
      measurementUnit: 'kg',
      value: '2.5',
    },
  },
  {
    id: 6,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      measurementUnit: 'kg',
      value: '2.5',
    },
  },
  {
    id: 7,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      measurementUnit: 'kg',
      value: '2.5',
    },
  },
];

const pokemonFavoritId = {
  1: false,
  2: false,
  3: false,
  4: false,
};

module.exports = {
  pokemonsApi,
  pokemonFavoritId,
};
