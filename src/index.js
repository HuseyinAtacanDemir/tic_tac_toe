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
    
    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    }
    
    handleClick(i){
      const squares = this.state.squares.slice();//immutable vars, better for detecting changes, version control...
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        xIsNext: !this.state.xIsNext, 
        squares: squares
      });
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
        const status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
        
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
        