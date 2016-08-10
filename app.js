var express = require('express')
var app = express()
var ejs = require('ejs')
var mongo = require('mongodb')
var client = mongo.MongoClient
app.engine('html', ejs.renderFile)
app.listen(2000)

app.get('/', home)
app.get('/register', register)
// app.post('/register', registerNewUser)
app.get('/save-user', registerNewUser)

function registerNewUser(req, res) {
	client.connect("mongodb://127.0.0.1/test1",
		(errord, db) => {
			var u = {}
			u.name = req.query.name
			u.email = req.query.email
			u.password = req.query.password
			db.collection("user").insert(u)
			res.redirect('/')
		}
	)
}

function home(req, res) {
	res.render('index.html')
}

function register(req, res) {
	res.render('register.html')
}
