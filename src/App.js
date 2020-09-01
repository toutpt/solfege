import React from 'react';
import './App.css';
import Partition from './components/Partition';
import Clavier from './components/Clavier';

/**
 * setup the state and handler
 */
function App() {
  // au clair de la lune
  const notes = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9];
  // const notes = [41, 43, 45, 47, 48];
  const [position, setPosition] = React.useState(0);
  const onNote = (n) => {
    if (notes[position] === n.pos) {
      setPosition(position + 1);
    }
  }
  return (
    <div className="App">
        <h1>Learn Soflege</h1>
        <Partition notes={notes} current={position} />
        <Clavier onNote={onNote}/>
    </div>
  );
}

export default App;
