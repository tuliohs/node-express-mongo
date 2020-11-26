const express = require('express')

const router = express.Router()

const Candidates = require('../models/candidates')

// GET all
router.get('/', async (req, res) => {
    try {
        const candidates = await Candidates.find()

        return res.send(candidates)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET by ID
router.get('/:id', getCandidates, async (req, res) => {

    res.json(res.candidates)
})

// POST create
router.post('/', async (req, res) => {

    const candidates = new Candidates({
        name: req.body.name,
        channel: req.body.channel
    })

    try {
        const created = await candidates.save()

        res.status(201).json(created)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// PATCH update
router.patch('/:id', getCandidates, async (req, res) => {
    if (req.body.name != null) {
        res.candidates.name = req.body.name
    }

    if (req.body.channel != null) {
        res.candidates.channel = req.body.channel
    }

    try {
        const updated = await res.candidates.save()

        res.json(updated)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE remove
router.delete('/:id', getCandidates, async (req, res) => {

    try {
        await res.candidates.remove()

        res.json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// middleware
async function getCandidates(req, res, next) {
    try {
        candidates = await Candidates.findById(req.params.id)

        if (candidates == null) {
            return res.status(404).json({ message: 'candidates not found' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    res.candidates = candidates

    next()
}

// export
module.exports = router