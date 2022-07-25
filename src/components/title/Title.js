import "./style.css"

export const Title = ({ round }) => {
  return (
    <div className="title-content">
      <div>Раунд</div>
      <div className="round">{round}</div>
    </div>

  )
}