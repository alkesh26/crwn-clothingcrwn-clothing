
import { useNavigate } from 'react-router-dom'
import './home-item.styles.scss'

function HomeItem({category}) {
  const {title, imageUrl, route} = category
  const navigate = useNavigate()

  const onNavigateHandler = () => navigate(route)

  return (
    <div className="home-container" onClick={onNavigateHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default HomeItem
