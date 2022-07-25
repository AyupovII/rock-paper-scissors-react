import { useEffect, useState } from "react";
import { Choice } from '../choice/Choice';
import "./style.css";
import rock from "../../assets/rock.png";
import paper from "../../assets/paper.png";
import scissors from "../../assets/scissors.png";

export const Player = ({ iconSelect = "", score = 0, onClick, auto = false }) => {
  const [icon, setIcon] = useState("");
  useEffect(() => {
    if (iconSelect === "Rock") setIcon(rock);
    if (iconSelect === "Paper") setIcon(paper);
    if (iconSelect === "Scissors") setIcon(scissors);

  }, [iconSelect]);

  return (
    <div className="player-zone">
      <div>
        {iconSelect ? <img src={icon} alt="alt" /> : <div className="player-not-select">Не выбран</div>}
      </div>
      <div className="player">
        <Choice value={"Rock"} icon={rock} onClick={auto? null : onClick} />
        <Choice value={"Paper"} icon={paper} onClick={auto? null : onClick} />
        <Choice value={"Scissors"} icon={scissors} onClick={auto? null : onClick} /></div>
      <div>Score: {score}</div>
    </div>
  )
}