import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

// Home Route
app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

// New Post Route
app.get('/new', (req, res) => {
  res.render('new');
});

app.get('/editor', (req, res) => {
    res.render('view', { posts: posts });
});

// Create Post Route
app.post('/posts', (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content
  };
  posts.push(newPost);
  res.redirect('/');
});

// Single Post Route
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render('post', { post: post });
  } else {
    res.status(404).send('Post not found');
  }
});

// Edit Post Route
app.get('/posts/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render('edit', { post: post });
});

// Update Post Route
app.post('/posts/update/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  post.title = req.body.title;
  post.imageUrl = req.body.imageUrl;
  post.content = req.body.content;
  res.redirect('/');
});

// Delete Post Route
app.post('/posts/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
