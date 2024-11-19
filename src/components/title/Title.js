import "./style.css"

export const Title = ({ round }) => {
  return (
    <div className="title-content">
      <div className="round-text">Round</div>
      <div className="round">{round}</div>
    </div>

  )
}