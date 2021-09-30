const express = require('express');
const mongoose = require('mongoose');
const Form = require('./models/form_model');

const app = express();
// app.listen(3000);
const dbURI = 'mongodb+srv://aman:test1234@nodetuts.98mkn.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.render('form');
});

app.post('/', (req, res) => {
    const form = new Form(req.body);
    form.save()
        .then((result) => {
            res.redirect('/done');
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/done', (req, res) => {
    res.render('done');
})