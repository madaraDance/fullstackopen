// eslint-disable-next-line react/prop-types
const Notification = ({ message }) => {
    if (message === '') {
      return null
    }
  
    return (
      <div className='notificationMessage'>
        {message}
      </div>
    )
  }

  export default Notification