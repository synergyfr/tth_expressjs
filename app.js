const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

// solutions to common problems - patterns
// the call server propgram that runs on a remote computer
//it waits for http requests from clients
// request - technical term when url is 'sent'
// a request -> response

// dpeloy to remote server

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');

// app.use( (req, res, next) => {
//     console.log('One');
//     req.message = 'This message made it!';
//     next();
// },
//     (req, res, next) => {
//     console.log(req.message);
//     next();
// });

//app.use( (req, res, next) => {
    // console.log('hell-0');
    // const err = new Error('Oh no!');
    // err.status = 500;
    // next(err);
//});
// ;

app.use( (req, res, next) => {
    console.log('World');
    next();
});

// app.use('/one', (req, res, next) => {
//     console.log('Two');
//     next();
// });

app.get('/', (req, res) => {
	const name = req.cookies.username;
	if (name) {
		res.render('index', { name });
	} else {
		res.redirect('hello');
	}
} );

app.get('/hello', (req, res) => {
	const name = req.cookies.username;
	if (name) {
		res.redirect('/');
	} else {
		res.render('hello');
	}
});

app.post('/hello', (req, res) => {
	res.cookie('username', req.body.username);
	// res.json(req.body);
	// res.render('hello', { name: req.body.username });
	
	res.redirect('/');
});

app.get('/cards', (req, res) => {
	res.locals.prompt = "Who is buried in Grant's tomb?";
	res.locals.hint = "Think about whose tomb it is.";
	res.render('card');
	//res.render('card', {prompt: "Who is buried in Grant's tomb?"
	// });
});

app.post('/goodbye', (req, res) => {
	res.clearCookie('username');
	res.redirect('hello');
});

app.use( (req, res, next) => {
	const err = new Error('Not found');
	err.status = 404;
	next(err);
});

app.use( (err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
	console.log('The application is running on localhost:3000');
});

// route is like a command given to the server
// get request to server, asking to get or return something
// url resource - tell server what to get for the client
// server response - information out
// server request - information

// 404 error, url does not exist

// learn different framework types
// 
// node mon