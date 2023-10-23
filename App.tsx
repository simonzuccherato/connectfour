import { useState } from 'react';

import {Button, Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: "center",
        padding: "1%"
    }
});

function Square({ value, onSquareClick }) {
  if (!value) {
    return (
        <Button title="   " onPress={onSquareClick}/>
    );
  }
  if (value === 'R') {
    return (
        <Button title="   " color='#ff0000' onPress={onSquareClick}/>
    );
  }
  if (value === 'Y') {
    return (
        <Button title="   " color='#ffff00' onPress={onSquareClick}/>
    );
  }
}

function Board({ redIsNext, squares, onPlay, num }) {
  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    let row = -1;
    for (let j = 5; j >= 0; j--) {
        if (!nextSquares[i+7*j]) {
            row = i+7*j;
            break;
        }
    }
    if (row === -1) {
        return;
    }
    if (redIsNext) {
      nextSquares[row] = 'R';
    } else {
      nextSquares[row] = 'Y';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + (winner === 'R' ? 'Red' : 'Yellow') + " Move: " + num;
  } else {
    status = 'Next player: ' + (redIsNext ? 'Red' : 'Yellow') + " Move: " + num;
  }
  var grid = [];
  for (let i = 0; i < 6; i++) {
    var row = [];
    for (let j = 0; j < 7; j++) {
        row.push(
            <Square key={i*7+j} value={squares[i*7+j]} onSquareClick={() => handleClick(j)}/>
        )
    }
    grid.push(
        <View key={i} style={styles.row}>
            { row }
        </View>
        )
  }
  return (
    <>
      <Text className="status">{status}</Text>
      { grid }
    </>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(42).fill(null));
  const [currentMove, setCurrentMove] = useState(0);
  const redIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    setBoard(nextSquares);
    setCurrentMove(currentMove + 1);
  }

  function reset() {
    setBoard(Array(42).fill(null));
    setCurrentMove(0);
  }

  return (
    <View className="game">
      <View className="game-board">
        <Board redIsNext={redIsNext} squares={board} onPlay={handlePlay} num={currentMove} />
      </View>
      <View style={styles.row}>
        <Button title="Reset Board" onPress={reset}/>
      </View>
    </View>
  );
}

function calculateWinner(squares) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 6; j++) {
        let start = j * 7 + i;
        if(squares[start] && squares[start] === squares[start + 1] && squares[start] === squares[start + 2] && squares[start] === squares[start + 3]) {
            return squares[start];
        }
    }
  }
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
        let start = j * 7 + i;
        if(squares[start] && squares[start] === squares[start + 7] && squares[start] === squares[start + 14] && squares[start] === squares[start + 21]) {
            return squares[start];
        }
    }
  }
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          let start = j * 7 + i;
          if(squares[start] && squares[start] === squares[start + 8] && squares[start] === squares[start + 16] && squares[start] === squares[start + 24]) {
              return squares[start];
          }
      }
  }
  for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 6; j++) {
            let start = j * 7 + i;
            if(squares[start] && squares[start] === squares[start - 6] && squares[start] === squares[start - 12] && squares[start] === squares[start - 18]) {
                return squares[start];
            }
        }
  }
  return null;
}
