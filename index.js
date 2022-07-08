const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;

const tasks = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	if (!req.session.tasks) {
		req.session.tasks = [];
	}
	res.render('todolist', { tasks: req.session.tasks });
});

app.get('/task/:id/done', (req, res) => {
	if (req.session.tasks[req.params.id]) {
		req.session.tasks[req.params.id].done = true;
	}
	res.redirect('/');
});

app.get('/task/:id/delete', (req, res) => {
	if (req.session.tasks[req.params.id]) {
		req.session.tasks.splice(req.params.id, 1);
	}
	res.redirect('/');
});

app.post('/', (req, res) => {
	if (req.body.task) {
		req.session.tasks.push({
			title: req.body.task,
			done: false,
		});
	}
	res.redirect('/');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
