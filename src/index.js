import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//const e = React.createElement;



class Square extends React.Component {
  render() {
    //pass a function as the on click prop, if you just said alert, an alert would fire every time the page renders...
    return ( 
      <button className="square" onClick={()=>alert('anan')}> 
        {this.props.value}
      </button>
    ); //we are catching the prop entered in the calling component, int he called component
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />; //passing prop (a value) to the square component
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
