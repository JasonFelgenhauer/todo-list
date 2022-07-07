const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const tasks = [
    {
        title: 'Task 1',
        done: true,
    }
]

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('todolist', { tasks: tasks });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));