const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

let post = [];
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { post }); 
});
app.get('/content', function(req, res){
    res.render('content');
})
app.post("/", function (req, res) {
    const pname = req.body.name;
    const ptitle = req.body.title;

    const newPost = {
        fName: pname,
        fTitle: ptitle
    };
    post.push(newPost);
    res.render('index', { post }); 
});
   

app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const postToEdit = post[postId];
    res.render('edit', { postToEdit, postId });
});

app.post('/update/:id', (req, res) => {
    const postId = req.params.id;
    const pname = req.body.name;
    const ptitle = req.body.title;

    post[postId] = {
        fName: pname,
        fTitle: ptitle
    };
    
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    post.splice(postId, 1); // Remove the post from the array
    res.redirect('/');
});















app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
