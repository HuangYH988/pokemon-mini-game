import bug from './images/Bug.png'
import dark from './images/Dark.png'
import dragon from './images/Dragon.png'
import electric from './images/Electric.png'
import fairy from './images/Fairy.png'
import fighting from './images/Fighting.png'
import fire from './images/Fire.png'
import flying from './images/Flying.png'
import ghost from './images/Ghost.png'
import grass from './images/Grass.png'
import ground from './images/Ground.png'
import ice from './images/Ice.png'
import normal from './images/Normal.png'
import poison from './images/Poison.png'
import psychic from './images/Psychic.png'
import rock from './images/Rock.png'
import steel from './images/Steel.png'
import water from './images/Water.png'

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 19 types in our deck. We will loop over this array.
  const types = [null,"Normal","Fighting","Psychic","Dark","Ghost","Bug","Dragon",
                "Flying","Fairy","Rock","Ground","Steel","Poison","Grass","Water","Ice",
                "Electric","Fire"];
  
  const images = [null,normal,fighting,psychic,dark,ghost,bug,dragon,flying,fairy,
                  rock,ground,steel,poison,grass,water,ice,electric,fire]

  
  // Loop over the suits array
  for (let typeIndex = 0; typeIndex < types.length; typeIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = types[typeIndex];
    let img = document.createElement("img");
    img.src = images[typeIndex];
    img.width= "200px";
    img.height= "auto";
    img.alt=types[typeIndex]+" type";
    

      // Create a new card with the current index and type
      const card = {
        index: typeIndex,
        type: currentSuit,
        image: img,
        
      };

      // Add the new card to the deck
      newDeck.push(card);
    
  }

  // Return the completed card deck
  return newDeck;
};

// Export functionality to create a shuffled 19-card deck
export const makeShuffledDeck = () => shuffleCards(makeDeck());
// export const getIndex = (card)=> card.index;
