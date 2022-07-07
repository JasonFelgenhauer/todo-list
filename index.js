const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const tasks = [
    
]

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('todolist', { tasks: tasks });
});

app.get('/task/:id/done', (req, res) => {
    if(tasks[req.params.id]) {
        tasks[req.params.id].done = true;
    }
    res.redirect('/');
})

app.get('/task/:id/delete', (req, res) => {
    if(tasks[req.params.id]) {
        tasks.splice(req.params.id, 1);
    }
    res.redirect('/');
})

app.post('/', (req, res) => {
    tasks.push({
        title: req.body.task_name,
        done: false,
    })
    res.redirect('/');
})

app.listen(port, () => console.log(`App listening on port ${port}!`));