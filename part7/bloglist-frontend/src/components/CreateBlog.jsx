/* eslint-disable linebreak-style */
import './CreateBlog.css'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlog = () => {
    const dispatch = useDispatch()
    const handleBlogCreation = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
    
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''

        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        dispatch(addNewBlog(newBlog))
        dispatch(setNotification(`New Blog: "${newBlog.title}" has been created`, 5))

    }

    return (
        <>
            <h2>Create New Blog:</h2>
            <form onSubmit={handleBlogCreation} style={{ display:'flex', flexDirection:'column' }}>
                <div className = "div">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="input-field"
                    />
                </div>
                <div className = "div">
                    <label htmlFor="author">Author: </label>
                    <input
                        type="text"
                        placeholder="Author"
                        name="author"
                        className="input-field"
                    />
                </div>
                <div className = "div">
                    <label htmlFor="url">URL: </label>
                    <input
                        type="text"
                        placeholder="URL"
                        name="url"
                        className="input-field"
                    />
                </div>
                <button
                    type="submit"
                    className="button"
                >Add new Blog</button>
            </form>
        </>
    )
}

export default CreateBlog