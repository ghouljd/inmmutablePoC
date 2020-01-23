import React, {useReducer, useEffect} from 'react';
import './App.css';
import { StateType } from "./types";
import reducer, {initialState} from "./reducer";
import { CHANGE_POKEMON_DATA, DECREMENT_INDEX, INCREMENT_INDEX } from "./constants";

const App: React.FC = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  const readableState: StateType = state.toJS();
  console.log(readableState);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${readableState.index}`)
    .then(response => response.json())
    .then(result => dispatch({
      type: CHANGE_POKEMON_DATA,
      payload: {
        image: result.sprites.front_default,
        name: result.name
      }
    }))
    .catch(error => {
      throw error;
    });
  }, [readableState.index]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={readableState.pokemon.image} className="App-image" alt="pokemon" />
        <p className="App-name">
        {readableState.pokemon.name} 
        </p>
        <button 
          className="App-button"
          onClick={() => dispatch({ type: INCREMENT_INDEX })}
        >
          Next
        </button>
        <button 
          className="App-button"
          onClick={() => dispatch({ type: DECREMENT_INDEX })}
        >
          Previous
        </button>
      </header>
    </div>
  );
}

export default App;
