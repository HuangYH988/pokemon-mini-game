import React from "react";
import "./App.css";
import { makeDeck, makeShuffledDeck } from "./utils.js";
import p_types from "./images/pokemon_type.png";
import DisplayType from "./displayType";
import Keyboard from "./keyboard/Keyboard";


const pTypes = [
  "Typeless",
  "Normal",
  "Fighting",
  "Psychic",
  "Dark",
  "Ghost",
  "Bug",
  "Dragon",
  "Flying",
  "Fairy",
  "Rock",
  "Ground",
  "Steel",
  "Poison",
  "Grass",
  "Water",
  "Ice",
  "Electric",
  "Fire",
];
class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      //Start game
      gameStart: false,
      // Set default value of card deck to new shuffled deck
      cardDeck: makeDeck(),
      cardDeck2: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currAtk: [],
      currDef: [],

      // State to track who won from the current round
      currWinner: null,

      // State to track the score of each player
      scoreboard: [0, 0],
      //Switch attack and defend
      p1Atk: true,
      roundNum: 0,
    };
  }
  rN = 0;
  // Code to determine who won, Player 1 or 2
  determineWinner = (atk, def) => {
    let i = atk[0].index;
    let j = def[0].index;
    let res = this.typeMatchUpChart[i][j];

    switch (res) {
      case 4:
        this.updateScore(1);
        break;
      case 2:
        this.updateScore(2);
        break;
      case 1:
        this.updateScore(3);
        break;
      case 0:
        this.updateScore(4);
        break;
      default:
        return;
    }
  };

  updateScore = (n) => {
    const { scoreboard } = this.state;
    //const {currWinner} = this.state;
    const { p1Atk } = this.state;

    if (p1Atk === true) {
      if (n === 1) {
        scoreboard[0] += 2;
        this.setState({ currWinner: "Player1" });
      } else if (n === 2) {
        this.setState({ currWinner: "No player" });
      } else if (n === 3) {
        scoreboard[1] += 1;
        this.setState({ currWinner: "Player2" });
      } else if (n === 4) {
        scoreboard[1] += 2;
        this.setState({ currWinner: "Player2" });
      }
    } else {
      if (n === 1) {
        scoreboard[1] += 2;
        this.setState({ currWinner: "Player2" });
      } else if (n === 2) {
        this.setState({ currWinner: "No player" });
      } else if (n === 3) {
        scoreboard[0] += 1;
        this.setState({ currWinner: "Player1" });
      } else if (n === 4) {
        scoreboard[0] += 2;
        this.setState({ currWinner: "Player1" });
      }
    }
    this.setState({ scoreboard });
    this.changeP1Atk();
  };

  dealType = (typePlayed) => {
    const { p1Atk, cardDeck } = this.state;

    this.rN++;
    //Pops a specific card from deck
    if (this.state.cardDeck !== []) {
      const num = pTypes.indexOf(typePlayed);
      let type_played;
      //console.log(typePlayed);
      if (typePlayed === "Typeless") {
        type_played = null;
      } else {
        type_played = typePlayed;
      }
      const pType = {
        index: num,
        type: type_played,
      };

      let newP1Card = [];
      newP1Card.push(pType);
      const newP2Card = [this.state.cardDeck2.pop()];

      console.log(cardDeck.filter((p_type) => p_type.type !== type_played));
      p1Atk
        ? this.setState(
            {
              cardDeck: cardDeck.filter(
                (p_type) => p_type.type !== type_played
              ),

              currAtk: newP1Card,
              currDef: newP2Card,
              roundNum: this.rN,
            },
            () => {
              // Call determineWinner after the state has been updated

              this.determineWinner(newP1Card, newP2Card);
            }
          )
        : this.setState(
            {
              cardDeck: cardDeck.filter(
                (p_type) => p_type.type !== type_played
              ),
              currAtk: newP2Card,
              currDef: newP1Card,
              roundNum: this.rN,
            },
            () => {
              // Call determineWinner after the state has been updated

              this.determineWinner(newP2Card, newP1Card);
            }
          );
    } else {
      return (
        <p>
          The deck is out of cards. Please click 'restart to restart the game.
        </p>
      );
    }
  };

  startGame = () => {
    this.setState({ gameStart: true });
  };
  restartGame = () => {
    this.rN = 0;
    this.setState({
      cardDeck: makeDeck(),
      cardDeck2: makeShuffledDeck(),
      currAtk: [],
      currDef: [],
      currWinner: null,
      scoreboard: [0, 0],
      p1Atk: true,
      roundNum: 0,
      gameStart: false,
    });
  };
  changeP1Atk = () => {
    const { p1Atk } = this.state;
    p1Atk ? this.setState({ p1Atk: false }) : this.setState({ p1Atk: true });
  };
 
  
  typeMatchUpChart = [
    /*typeless, Normal","Fighting","Psychic","Dark","Ghost","Bug","Dragon",
     "Flying","Fairy","Rock","Ground","Steel","Poison","Grass","Water","Ice",
     "Electric","Fire"*/
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2],
    [2, 4, 2, 1, 4, 0, 1, 2, 1, 1, 4, 2, 4, 1, 2, 2, 4, 2, 2],
    [2, 2, 4, 1, 0, 2, 2, 2, 2, 2, 2, 2, 1, 4, 2, 2, 2, 2, 2],
    [2, 2, 1, 4, 1, 4, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 2, 4, 1, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 1, 4, 4, 1, 2, 2, 1, 1, 2, 2, 1, 1, 4, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 4, 2, 0, 2, 2, 1, 2, 2, 2, 2, 2, 2],
    [2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 1, 2, 1, 2, 4, 2, 2, 1, 2],
    [2, 2, 4, 2, 4, 2, 2, 4, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1],
    [2, 2, 1, 2, 2, 2, 4, 2, 4, 2, 2, 1, 1, 2, 2, 2, 4, 2, 4],
    [2, 2, 2, 2, 2, 2, 1, 2, 0, 2, 4, 2, 4, 4, 1, 2, 2, 4, 4],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 1, 2, 2, 1, 4, 1, 1],
    [2, 2, 2, 2, 2, 1, 2, 2, 2, 4, 1, 1, 0, 1, 4, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 4, 4, 1, 1, 1, 4, 2, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 4, 4, 2, 2, 1, 1, 2, 2, 4],
    [2, 2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 4, 1, 2, 4, 1, 1, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 1, 4, 2, 2, 0, 2, 2, 1, 4, 2, 1, 2],
    [2, 2, 2, 2, 2, 2, 4, 1, 2, 2, 1, 2, 4, 2, 4, 1, 4, 2, 1],
  ];

  render() {
  
    const { gameStart, cardDeck, currWinner, scoreboard, p1Atk, roundNum } =
      this.state;

    const currAtkElems = this.state.currAtk.map(({ type }) =>
      // Give each list element a unique key
      
        p1Atk ? (
          <div key={`${type}1`}>
            Player2 used <DisplayType type={type} /> type attack
          </div>
        ) : (
          <div key={`${type}1`}>
            Player1 used <DisplayType type={type} /> type attack
          </div>
        )
      
    );
    const currDefElems = this.state.currDef.map(({ type }) =>
      // Give each list element a unique key
       
        !this.state.p1Atk ? (
          <div key={`${type}2`}>
            against Player2's <DisplayType type={type} /> type
          </div>
        ) : (
          <div key={`${type}2`}>
            against Player1's <DisplayType type={type} /> type
          </div>
        )
      
    );

    const currImage = () => {
      return (
        <img src={p_types} width="500px" height="300px" alt="pokemon types" />
      );
    };

    const displayOutput = () => {
      if (currWinner) {
        return (
          <div>
            <h3>
              {currWinner} has won round {roundNum}
            </h3>
            <p>Player 1 has {scoreboard[0]} points.</p>
            <p>Player 2 has {scoreboard[1]} points.</p>
          </div>
        );
      } else {
        return (
          <div>
            <p>Select a type for the round.</p>
          </div>
        );
      }
    };
    const gameBegin = () => {
      if (gameStart) {
        return <div>{displayOutput()}</div>;
      } else {
        return <div>Press 'Start' to start the game.</div>;
      }
    };
    const gameWinner =
      scoreboard[0] > scoreboard[1] ? (
        <h3>Player 1 has won this game</h3>
      ) : scoreboard[0] < scoreboard[1] ? (
        <h3>Player 2 has won this game</h3>
      ) : (
        <h3>Both players are tied</h3>
      );
    return (
      <div className="App">
        <header className="App-header">
          {gameStart ? (
            <div><br /></div>
          ) : (
            <div>
              {currImage()}

              <h3>Pokemon Type match-up Card game🚀</h3>
            </div>
          )}

          {currAtkElems}
          {currDefElems}

          {gameBegin()}

          {cardDeck.length === 0 ? (
            <div>
              {gameWinner}
              <p>Press Restart to restart the game</p>
            </div>
          ) : gameStart ? (
            <div>
              
              {<Keyboard onClick={this.dealType} />}
            </div>
          ) : (
            <button onClick={this.startGame}>Start</button>
          )}
          <br />
          <br />
          {cardDeck.length === 0 ? <br /> : <p>Reset the game:</p>}

          <button onClick={this.restartGame}>Restart</button>
        </header>
      </div>
    );
  }
}

export default App;
