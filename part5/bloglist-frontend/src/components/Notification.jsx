const Notification = ({blog, message}) => {
    return (
        <>
            { message === null ? (
                <>a new blog { blog.name } by {blog.author} added</>
            ) : (
                <></>
            )}
        </>

    )
}

export default Notification