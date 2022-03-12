const express = require('express')

const mongoose = require('mongoose')
const Post = require('./models/post')
const postRouter = require('./routes/posts')
const methodOverride = require('method-override')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/express-blog', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: 'desc' })
    res.render('posts/index', { posts: posts })
})

app.use('/posts', postRouter)
app.listen('5000')