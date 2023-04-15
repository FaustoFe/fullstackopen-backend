const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

require('dotenv').config()

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// Logger middleware
app.use((req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
})

app.get('/api', (req, res) => {
  res.send(`
    <h1>Notes REST API</h1>
    <ul>
      <li>See <b>GET</b> <a href="/api/notes">/api/notes</a> for all notes</li>
      <li>See <b>GET</b> <a href="/api/notes/:id">/api/notes/:id</a> for a single note</li>
      <li>See <b>POST</b> <a href="/api/notes">/api/notes</a> to create a new note</li>
      <li>See <b>PUT</b> <a href="/api/notes/:id">/api/notes/:id</a> to update a note</li>
      <li>See <b>DELETE</b> <a href="/api/notes/:id">/api/notes/:id</a> to delete a note</li>
    </ul>
  `)
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = Number(req.params.id)
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if (body.content === undefined) {  
    return res.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => {
      res.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body

  const note = {
    content,
    important,
  }
  
  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// Unknown endpoint middleware
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// Error middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
