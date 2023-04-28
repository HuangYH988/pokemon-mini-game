import React from "react";

class DisplayType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type } = this.props;
    // const types = [
    //   "Typeless",
    //   "Normal",
    //   "Fighting",
    //   "Psychic",
    //   "Dark",
    //   "Ghost",
    //   "Bug",
    //   "Dragon",
    //   "Flying",
    //   "Fairy",
    //   "Rock",
    //   "Ground",
    //   "Steel",
    //   "Poison",
    //   "Grass",
    //   "Water",
    //   "Ice",
    //   "Electric",
    //   "Fire",
    // ];
    let myImage;

    if (type === null) {
      myImage = require(`./images/Typeless.png`);
    } else {
      myImage = require(`./images/${type}.png`);
    }

    return (
      <div>
        <img src={myImage} width="70" alt={type} key={type} />
      </div>
    );
  }
}

export default DisplayType;
