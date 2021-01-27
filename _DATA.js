import AsyncStorage from '@react-native-async-storage/async-storage';
let decks;

const generateUID = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const formatDeck = (nameOfDeck) => {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    title: nameOfDeck,
    cards: [],
  };
};

const processDeck = (deck) => {
  return new Promise((res, rej) => {
    const formattedDeck = formatDeck(deck);

    setTimeout(() => {
      decks = {
        ...decks,
        [formattedDeck.title]: formattedDeck,
      };

      res(decks);
    }, 1000);
  });
};

export const saveCard = async (id, card) => {
  const results = await AsyncStorage.getItem('DECKS');
  const resultsObj = JSON.parse(results);
  const transformedTitle = id.split(' ').join('');
  const deck = resultsObj[transformedTitle];

  return AsyncStorage.mergeItem(
    'DECKS',
    JSON.stringify({
      [id]: {
        ...deck.cards,
        cards: [...deck.cards].concat(card),
      },
    })
  );
};

export const saveDeck = (title) => {
  const deckName = title.split(' ').join('');
  processDeck(deckName).then((res) => {
    AsyncStorage.mergeItem('DECKS', JSON.stringify(res));
    console.log(res);
  });
};

export const getDecks = async () => {
  try {
    const results = await AsyncStorage.getItem('DECKS');
    if (results === null) {
      return null;
    } else {
      return JSON.parse(results);
    }
  } catch (e) {
    // error reading value
  }
};

export const getDeck = async (id) => {
  const transformedTitle = id.split(' ').join('');
  const results = await AsyncStorage.getItem('DECKS');
  const match = JSON.parse(results);
  return match[transformedTitle];
};

export const deleteDeck = async (deckName) => {
  const results = await AsyncStorage.getItem('DECKS');
  const decks = JSON.parse(results);
  const transformedDeckName = deckName.split(' ').join('');
  delete decks[transformedDeckName];
  AsyncStorage.setItem('DECKS', JSON.stringify(decks));
};
