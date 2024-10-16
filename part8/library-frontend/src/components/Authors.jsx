import EditAuthor from "./EditAuthor"

const Authors = (props) => {

  if (!props.show) {
    return null
  }

  const authors = props.authors || undefined

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : 'N/A'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor authors={authors} notify={props.notify}/>
    </div>
  )
}

export default Authors
