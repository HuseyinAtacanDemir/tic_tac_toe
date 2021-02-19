import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//const e = React.createElement;

class Square extends React.Component {
  //delete square's constructor, since now the board keeps the state of the game
  // //a class can "remember" things using its state field
  // constructor(props){
  //   super(props);//in js you gotta call super everytime you define a constructor of any subclass
  //   this.state = {
  //     value: null,
  //   };
  // }

  render() {
    //pass a function as the on click prop, if you just said alert, an alert would fire every time the page renders...
    return ( 
      //by calling setState in an onClick handler, we tell react to re render whenever the button is clicked
      <button 
        className="square" 
        onClick={()=>this.props.onClick({value: 'X'})} //when you call setState within a component, react will update child components too
      > 
        {this.props.value}
      </button>
    ); //we are catching the prop entered in the calling component, int he called component
  }
}

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };

  }

  renderSquare(i) {
    return( 
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    ); //passing prop (a value) to the square component
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>

      // trying the same with React.createElement: aka react with no jsx
      // e is defined to be React.createElement above...

      // e('div', {className: 'game'},
      //   e('div', {className: 'game-board'},
      //     e(Board, null, null)
      //   ),
      //   e('div', {className: 'game-info'},
      //     e('div', null, null),
      //     e('ol', null, null)
      //   )
      // )
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
