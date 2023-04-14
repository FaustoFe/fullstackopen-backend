import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

// Logger middleware
app.use((req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
})

app.get('/', (req, res) => {
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
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max( ...notes.map(note => note.id)) 
    : 0

  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)
  
  res.json(note)
})

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  notes = notes.map(note => note.id === id ? req.body : note)
  if (note) {
    res.json(req.body)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  
  const note = notes.find(note => note.id === id)
  notes = notes.filter(note => note.id !== id)
  if (note) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

// Unknown endpoint
app.use((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})