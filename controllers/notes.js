const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

const getTokenFrom = req => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}

notesRouter.post('/', async (req, res) => {
  const { content, important } = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content,
    important: important || false,
    user: user._id,
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.status(201).json(savedNote)
})

notesRouter.put('/:id', async (req, res) => {
  const { content, important } = req.body

  const note = {
    content,
    important,
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })
  res.json(updatedNote)
})

notesRouter.delete('/:id', async (req, res) => {

  await Note.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = notesRouter