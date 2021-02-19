import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// use function components when the component only has a render func, and doesn't need to keep state
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick} //since props.onClick references a func already, we don't need to pass it in with an arrow func
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    // const boardObj = () => {
    //   return {};
    // }
    
    return (
      <div>
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
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {

    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length-1];
    const squares = current.squares.slice(); //immutable vars, better for detecting changes, version control...

    if(calculateWinner(squares) || squares[i])
      return;
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let isFull = true;

    for(let i = 0; i < current.squares.length; i++){
      if(!current.squares[i]){
        isFull = false;
      }
    }

    const draw = (!winner && isFull);

    const moves = history.map((step, move) => {
      const description = move ? 
        'Go to move#' + move :
        'Go to start';
        return(
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{description}</button>
          </li>
        );
    });

    let status;

    if(winner){
      status = 'Winner is: ' + winner;
    }else if(draw){
      status = "It's a draw!";
    }else{
      
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
  const winningLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i = 0; i < winningLines.length; i++){
    const [a, b, c] = winningLines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
