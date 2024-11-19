import "./style.css"

export const Choice = ({ icon, value, onClick, tabIndex }) => {
  return (
    <div className="choice" value={value} onClick={onClick} tabIndex={tabIndex}>
      <img className="choice-icon" src={icon} alt='icon' />
    </div>

  )
}                               