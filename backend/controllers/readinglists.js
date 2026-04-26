const router = require('express').Router()
const { User, Blog, ReadingLists } = require('../models')
const { tokenExtractor, sessionChecker } = require('../util/middleware')

router.post('/', async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).json({ error: 'userId is required' })
        }
        if (!req.body.blogId) {
            return res.status(400).json({ error: 'blogId is required' })
        }
        const user = await User.findByPk(req.body.userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        const blog = await Blog.findByPk(req.body.blogId)
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' })
        }
        const existing = await ReadingLists.findOne({
            where: {
                userId: req.body.userId,
                blogId: req.body.blogId
            }
        })
        if (existing) {
            return res.status(400).json({ error: 'Blog already in reading list' })
        }
        const readingList = await ReadingLists.create({
            userId: req.body.userId,
            blogId: req.body.blogId,
            read: req.body.read || false
        })
        res.status(201).json({ 
            id: readingList.id, 
            user_id: readingList.userId, 
            blog_id: readingList.blogId,
            read: readingList.read
        })
    } catch (err) {
        console.error('Error:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const readingList = await ReadingLists.findByPk(req.params.id)
        if (!readingList) {
            return res.status(404).json({ error: 'Reading list entry not found' })
        }
        res.json(readingList)
    } catch (err) {
        console.error('Error:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.put('/:id', tokenExtractor, sessionChecker, async (req, res) => {
    try {
        const readingList = await ReadingLists.findByPk(req.params.id)
        if (!readingList) {
            return res.status(404).json({ error: 'Reading list entry not found' })
        }
        if (readingList.userId !== req.userId) {
            return res.status(401).json({ error: 'Unauthorized: This is not your list.' })
        }

        readingList.read = req.body.read
        await readingList.save()
        res.json(readingList)
    } catch (err) {
        console.error('Error:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router