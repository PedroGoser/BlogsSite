const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const bodyParser = require("body-parser")


// express app
const app = express();

// Connect to mongoDB, is an asynchonus task
const dbURI = 'mongodb+srv://viethen:bob19738@cluster0.vyp1opo.mongodb.net/node-tuts?retryWrites=true&w=majority'; //that's the real login and password, please don't hack me :)
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000)) // listen for requests
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// Middleware that logs info
app.use(morgan('dev'));

// Takes all encoded(string) url data an passes it onto an object, here its being used to create a blog with app.post

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({extended: true}));


// OLD CODE THAT IS HERE JUST IN CASE I FORGET HOW SOMETHING WORKS
/*
// MONGOSE AND MONGO SANDBOX ROUTES

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'percy jacson',
        snippet: 'gods and stuff',
        body: 'a lot lot of gods and stuff'
    });

    // Is asynchonus
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {

    // Is asynchonus
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('64077cd2f20b81be00507286')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});
*/

// Makes the files in '/public' acessable to the client through the URL
app.use(express.static('public'));

// routes
// .get() works in sequence, just like if elif elif else
app.get('/', (req, res) => {
    res.redirect('/blogs');
    /*
    //res.send('<p>It is possible to send html</p>');
    //res.sendFile('C:/Users/Add/Desktop/Site/home.html');
    blogs = [
            {title: 'harry potter', snippet: 'wizards and spells and stuff'},
            {title: 'percy jackson', snippet: 'gods and bolts and stuff'},
        ]

    res.render('index', {title: 'Index', blogs});
    // Once we render() the server response ends and bellow code is ignored
    */
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'});
})

// Only triggers callback functioin if get == /about
app.get('/about', (req, res) => {
    //res.send('<p>I am home!</p>');

    res.render('about', {title: 'About'});
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1}) //Descending order
        .then((result) => {
            res.render('index', {title: 'All blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body) // req.body is the whole decoded data from the url, not just the blog body

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
});


// 404 page, .use() means = "use this function for every incoming url"
app.use((req, res) => {
    //res.status(404).sendFile('C:/Users/Add/Desktop/Site/404.html');

    res.status(404).render('404', {title: 'Not Found'});
});
