import React from "react";

class DisplayType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cardDeck } = this.props;
    const types = [
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
    let picArray = [];
    
    for (let i = 0; i < types.length; i++) {
      let cType = types[i];
      let myImage = require(`./images/${cType}.png`);
      picArray.push(myImage);
    }

    return (
      <div>
        {cardDeck.map(({ index, type }) => (
          <img src={picArray[index]} width="70" alt={type} key={type}/>
        ))}
      </div>
    );
  }
}

export default DisplayType;
