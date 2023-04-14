import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import p_types from "./images/pokemon_type.png";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      //Start game
      gameStart: false,
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      cardDeck2: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currAtk: [],
      currDef: [],

      // State to track who won from the current round
      currWinner: null,

      // State to track the score of each player
      scoreboard: [0, 0],
      //Switch attack and defend
      p1Atk: false,
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
  };

  dealCards = () => {
    this.changeAtkDef();

    this.rN++;
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    if (this.state.cardDeck !== []) {
      const newP1Card = [this.state.cardDeck.pop()];
      const newP2Card = [this.state.cardDeck2.pop()];
      const adState = this.state.p1Atk;

      adState
        ? this.setState(
            {
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
    this.setState({
      cardDeck: makeShuffledDeck(),
      cardDeck2: makeShuffledDeck(),
      currAtk: [],
      currDef: [],
      currWinner: null,
      scoreboard: [0, 0],
      p1Atk: false,
      roundNum: 0,
      gameStart: false,
    });
  };
  changeAtkDef = () => {
    const adState = this.state.p1Atk;

    adState ? this.setState({ p1Atk: false }) : this.setState({ p1Atk: true });
  };

  displayImages = (card) => {
    return (
      <div>
        <img src={card.src} alt="pokemon types" />
      </div>
    );
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
    //Code to check the winner: if cardRank not same, return higher cardRank, if same, check for suite and return higher suite
    const { gameStart, cardDeck, currWinner, scoreboard, p1Atk, roundNum } =
      this.state;
    const currAtkElems = this.state.currAtk.map(({ type }) =>
      // Give each list element a unique key
      type ? (
        p1Atk ? (
          <div key={`${type}1`}>Player1 used {type} type attack</div>
        ) : (
          <div key={`${type}1`}>Player2 used {type} type attack</div>
        )
      ) : p1Atk ? (
        <div key={`typeless1`}>Player1 used Typeless attack</div>
      ) : (
        <div key={`typeless1`}>Player2 used Typeless attack</div>
      )
    );
    const currDefElems = this.state.currDef.map(({ type }) =>
      // Give each list element a unique key
      type ? (
        !this.state.p1Atk ? (
          <div key={`${type}2`}>against Player1's {type} type</div>
        ) : (
          <div key={`${type}2`}>against Player2's {type} type</div>
        )
      ) : !this.state.p1Atk ? (
        <div key={`typeless2`}>against Player1's Typeless</div>
      ) : (
        <div key={`typeless2`}>against Player2's Typeless</div>
      )
    );
    const currImage = () => {
      return (
        <img src={p_types} width="500px" height="300px" alt="pokemon type" />
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
      console.log(gameStart);
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
          {currImage()}
          <h3>Pokemon Type match-up Card game🚀</h3>
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
            <button onClick={this.dealCards}>Deal</button>
            <button onClick={this.dealCards}>Fire</button>
            <button onClick={this.dealCards}>Electric</button>
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