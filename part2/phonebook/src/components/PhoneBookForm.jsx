/* eslint-disable react/prop-types */

const PhoneBookForm = ({handleSumbit, handleChange, newName, newNumber}) => {
    return (
        <>
            <h3>add a new</h3>
            <form>
                <div>
                    name: <input onChange={handleChange} id='name' value={newName}/>
                </div>
                <div>
                    number: <input onChange={handleChange} id='number' value={newNumber}/>
                </div>
                <div>
                    <button type="submit" onClick={handleSumbit}>add</button>
                </div>
            </form>
        </>
    )
}

export default PhoneBookForm
