import { useEffect, useState } from "react";
import { Choice } from '../choice/Choice';
import "./style.css";
import rock from "../../assets/rock.png";
import paper from "../../assets/paper.png";
import scissors from "../../assets/scissors.png";

export const Player = ({ iconSelect = "", score = 0, onClick, auto = false, name, innerRef }) => {
  const [icon, setIcon] = useState("");
  useEffect(() => {
    if (iconSelect === "Rock") setIcon(rock);
    if (iconSelect === "Paper") setIcon(paper);
    if (iconSelect === "Scissors") setIcon(scissors);
  }, [iconSelect]);
  return (
    <div className={`player-zone ${auto ? "player-zone-ii" : ""}`}>
      <div>
        {iconSelect ? <img src={icon} alt="alt" /> : <div className="player-not-select">Не выбран</div>}
      </div>
      <div className="player" ref={innerRef}>
        <Choice value={"Rock"} icon={rock} onClick={auto ? null : onClick} tabIndex={`${auto ? -1 : parseInt(name.match(/\d+/))}_${1}`} />
        <Choice value={"Paper"} icon={paper} onClick={auto ? null : onClick} tabIndex={`${parseInt(auto ? -1 : name.match(/\d+/))}_${2}`} />
        <Choice value={"Scissors"} icon={scissors} onClick={auto ? null : onClick} tabIndex={`${parseInt(auto ? -1 : name.match(/\d+/))}_${3}`} /></div>
      <div>Score: {score}</div>
    </div>
  )
}