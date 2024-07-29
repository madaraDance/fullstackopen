import { useState } from "react"
import './CreateBlog.css'
import blogService from '../services/blogs' 

const CreateBlog = ({token, blogs, setBlogs, setNotif}) => {
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

    const handleBlogCreation = async (event) => {
        event.preventDefault()
        const blog = await blogService.addNewBlog(token, newBlog)
        console.log(blog)
        if (blog) {
            setBlogs(blogs.concat(newBlog))
            setNotif(1)
        } else {
            setNotif(2)
        }
        setTimeout(() => {
            setNotif(0);
          }, 2000);
    }
    
    const handleChange = (event) => {
        setNewBlog((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return ( 
        <>
            <h2>Create New Blog:</h2>
            <form onSubmit={handleBlogCreation} style={{display:"flex", flexDirection:"column"}}>
                <div className = "div">
                    <label htmlFor="title">Title: </label>
                    <input 
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className = "div">
                    <label htmlFor="author">Author: </label>
                    <input 
                        type="text"
                        placeholder="Author"
                        name="author"
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className = "div">
                    <label htmlFor="url">URL: </label>
                    <input 
                        type="text"
                        placeholder="URL"
                        name="url"
                        onChange={handleChange}
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