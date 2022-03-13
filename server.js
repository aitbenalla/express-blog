const express = require('express')

const mongoose = require('mongoose')
const Post = require('./models/post')
const postRouter = require('./routes/posts')
const methodOverride = require('method-override')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/express-blog', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: 'desc' })
    res.render('index', { posts: posts })
})

app.use('/posts', postRouter)
app.listen('5000')