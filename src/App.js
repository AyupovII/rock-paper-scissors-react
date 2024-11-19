import './style.css';
import { Player } from './components/player/Player';
import { TableResult } from './components/tableResult/TableResult';
import { Title } from './components/title/Title';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState,] = useState({
    playerSelect: "",
    computerSelect: "",
    round: 1,
    playerScore: 0,
    computerScore: 0,
    message: "VS",
  })
  //// тут можно сделать переключение между игроками/компьютером
  const [auto, setAuto] = useState(true);
  const [disableCheckbox, setDisableCheckbox] = useState(true);
  const [history, setHistory] = useState([]);
  const [play, setPlay] = useState(true);
  const restartHandler = () => {
    setState({
      playerSelect: "",
      computerSelect: "",
      round: 1,
      playerScore: 0,
      computerScore: 0,
      message: "VS",
    });
    setHistory([]);
    setAuto(false);
    setDisableCheckbox(false);
  }
  const pickPlayer = (e, player) => {
    if (state[player] !== "") return
    const pickElement = e.target.parentNode.getAttribute("value");
    setState({ ...state, [player]: pickElement })
  }

  const restart = () => {
    if (state.computerSelect && state.playerSelect)
      setState({ ...state, computerSelect: "", playerSelect: "", message: "VS", round: state.message !== "Ничья" ? (state.round + 1) : state.round })
  }

  const nextRound = () => {
    if (state.message !== "VS" && state.message !== "Ничья") {

      if (!play) {
        setPlay(true);
      }
      else {
        const resultToHistory = history;
        resultToHistory.push({ ...state })
        setHistory(resultToHistory);
      }
    }
    restart();
  }
  const handler = (e) => {
    const targetHistory = history.slice(0, e + 1);
    setPlay(false);
    setState(history[e]);
    setHistory(targetHistory);
  }
  useEffect(() => {
    if (state.computerSelect && state.playerSelect && play) {
      if (state.computerSelect === state.playerSelect) { setState({ ...state, message: "Ничья" }) }
      else {
        ((state.computerSelect === "Rock" && state.playerSelect === "Scissors") ||
          (state.computerSelect === "Paper" && state.playerSelect === "Rock") ||
          (state.computerSelect === "Scissors" && state.playerSelect === "Paper")) ?
          setState({
            ...(state.message = auto ? "Победил компьютер" : "Победил игрок 2"),
            ...(state.computerScore = state.computerScore + 1)

          }) :
          setState({
            ...(state.message = "Победил игрок 1"),
            ...(state.playerScore = state.playerScore + 1)
          });
        setState({ ...state })
      }
    }
  }, [state.playerSelect, state.computerSelect]);

  useEffect(() => {
    if (auto && play) {
      if (state.playerSelect !== "") {
        const rand = Math.round(Math.random() * 2);
        setState({ ...state, computerSelect: ["Rock", "Paper", "Scissors"][rand] });
      }
    }
  }, [auto, state.playerSelect]);

  // useEffect(() => {
  //   if ((state.computerSelect !== "" || state.playerSelect !== "" || state.round) && play) {
  //     setDisableCheckbox(true);

  //   }
  // }, [state.playerSelect, state.computerSelect])
  return (
    <div className="App">
      <Title round={state.round} />
      <div className='play-ground'>
        <Player
          iconSelect={state.playerSelect}
          score={state.playerScore}
          onClick={(e) => pickPlayer(e, "playerSelect")}
          name="player1"
        />
        <div className='app-result'>
          <div className='message'>{state.message}</div>
          <div className='btn-next-round' onClick={() => nextRound()}>
            {state.message === 'Ничья' ? "Переиграть" : "Следующий раунд"}
          </div>
        </div>
        <Player
          auto={auto}
          iconSelect={state.computerSelect}
          score={state.computerScore}
          onClick={(e) => pickPlayer(e, "computerSelect")}
          name="player2"

        />
      </div>
      {/* {!auto && <div className='control-area'>
        <div className='checkbox-auto'>
          <span>Компьютер</span>
          <input type='checkbox' disabled={disableCheckbox} checked={auto} onChange={() => setAuto(!auto)} />
        </div>
      </div>} */}
      <TableResult history={history} auto={auto} handler={(e) => handler(e)} />
      <button onClick={restartHandler}>Начать заново</button>
    </div>
  );
}

export default App;
