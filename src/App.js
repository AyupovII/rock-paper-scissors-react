import './style.css';
import { Player } from './components/player/Player';
import { TableResult } from './components/tableResult/TableResult';
import { Title } from './components/title/Title';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState({
    playerSelect: "",
    computerSelect: "",
    round: 0,
    playerScore: 0,
    computerScore: 0,
    message: "VS",
  })
  const [auto, setAuto] = useState(false);
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  const [history, setHistory] = useState([]);

  const pickPlayer = (e, player) => {
    if (state[player] !== "") return
    const pickElement = e.target.parentNode.getAttribute("value");
    setState({ ...state, [player]: pickElement })
  }

  const restart = () => {
    setState({ ...state, computerSelect: "", playerSelect: "", message: "VS" })
  }

  const nextRound = () => {
    if (state.message !== "VS" && state.message !== "Ничья") {
      const resultToHistory = history;
      resultToHistory.push({ ...state })
      setHistory(resultToHistory);
    }
    restart();

  }
  const handler=(e)=>{
    setState(history[e]);
  }
  useEffect(() => {
    if (state.computerSelect && state.playerSelect) {
      if (state.computerSelect === state.playerSelect) { setState({ ...state, message: "Ничья" }) }
      else {
        ((state.computerSelect === "Rock" && state.playerSelect === "Scissors") ||
          (state.computerSelect === "Paper" && state.playerSelect === "Rock") ||
          (state.computerSelect === "Scissors" && state.playerSelect === "Paper")) ?
          setState({
            ...(state.message = "Победил игрок 2"),
            ...(state.computerScore = state.computerScore + 1)

          }) :
          setState({
            ...(state.message = "Победил игрок 1"),
            ...(state.playerScore = state.playerScore + 1)
          });
        setState({ ...state, round: ++state.round })
      }
    }
  }, [state.playerSelect, state.computerSelect]);
  useEffect(() => {
    if (auto) {
      if (state.playerSelect !== "") {
        const rand = Math.round(Math.random() * 2);
        setState({ ...state, computerSelect: ["Rock", "Paper", "Scissors"][rand] });
      }
    }
  }, [auto, state.playerSelect]);
  useEffect(() => {
    if (state.computerSelect !== "" || state.playerSelect !== "" || state.round) {
      setDisableCheckbox(true);

    }
  }, [state.playerSelect, state.computerSelect])
  return (
    <div className="App">
      <Title round={state.round} />
      <div className='play-ground'>
        <Player
          iconSelect={state.playerSelect}
          score={state.playerScore}
          onClick={(e) => pickPlayer(e, "playerSelect")} />
        <div className='app-result'>
          <div>{state.message}</div>
          <div className='btn-next-round' onClick={() => nextRound()}>
            {state.message === 'Ничья' ? "Переиграть" : "Следующий раунд"}
          </div>
        </div>
        <Player
          auto={auto}
          iconSelect={state.computerSelect}
          score={state.computerScore}
          onClick={(e) => pickPlayer(e, "computerSelect")} />
      </div>
      <div className='control-area'>
        <div className='checkbox-auto'>
          <span>Компьютер</span>
          <input type='checkbox' disabled={disableCheckbox} checked={auto} onChange={() => setAuto(!auto)} />
        </div>
      </div>
      <TableResult history={history} handler={(e)=>handler(e)} />
    </div>
  );
}

export default App;
