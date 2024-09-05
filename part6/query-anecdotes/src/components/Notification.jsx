import store from '../components/store'
import { useSelector } from "react-redux"


const Notification = (message) => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: notification ? 'solid 1px black' : 'none',
    padding: 10,
    marginBottom: 5,
    display: notification ? 'block' : 'none'
  }

  return (
      <div style={style}>
        {notification || ''}
      </div>
  )
}

export default Notification
