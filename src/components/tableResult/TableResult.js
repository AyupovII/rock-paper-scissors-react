import "./style.css";

export const TableResult = ({ history, handler, auto }) => {
  return (
    <div className="table">

      <div className="table-result">
        <div className="table-result__round">Round</div>
        <div>Игрок 1</div>
        <div>{auto ? "Компьютер" : "Игрок 2"}</div>
      </div>
      {
        history.map((el, index) => {
          return (
            <div className="table-result" key={index}>
              <div className="table-result__round">{el.round}</div>
              <div>{el.playerScore}</div>
              <div>{el.computerScore}</div>
              <button onClick={() => handler(index)}>{"<="}</button>
            </div>)

        })
      }
    </div>
  )
}