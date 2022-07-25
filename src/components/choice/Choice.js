import "./style.css"

export const Choice = ({ icon, value, onClick }) => {
  return (
    <div className="choice" value={value} onClick={onClick}>
      <img className="choice-icon" src={icon} alt='icon'  />
    </div>

  )
}