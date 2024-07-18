const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =`mongodb+srv://maksimminenko97:ET8nlSMdozoFKfOZ@fullstack.8kcrg9b.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=fullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

const person = new Phonebook(
        { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122"
        }
    )


person.save().then(result => {
  console.log('Entries saved!')
  mongoose.connection.close()
})