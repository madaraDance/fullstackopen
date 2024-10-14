const Reccomended = (props) => {
    if (!props.show) {
        return null
      }
    
    const books = props.books
    const user = props.user
    const filteredBooks = books.filter(b => b.genres.includes(user.favoriteGenre))

    if (filteredBooks.length === 0) {
        return (
            <>
            <h2>No books in you favorite genre.</h2>
            </>
        )
    }

    return(
        <>
            <h2>Reccomendations</h2>
            <h3>Books in you favorute genre {user.favoriteGenre}</h3>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {filteredBooks.map((b) => (
                    <tr key={b.id}>
                    <td>{b.title}</td>
                    <td>{b.author?.name}</td>
                    <td>{b.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default Reccomended