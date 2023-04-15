const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DB_URI
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})