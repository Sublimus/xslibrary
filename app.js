const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session');
const passport = require('passport')

const app = express();

const flash = require('express-flash');
app.use(flash());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set up view engine

var nunjucks = require('nunjucks');
nunjucks.configure('views', {
	autoescape: true,
	express: app
});
app.set('view engine', 'njk');

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey],
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, ()=>{
	console.log('connected to mongodb')
})

app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.use("/room", require('./routes/room-routes'));
app.use("/reservation", require('./routes/reservation-routes'));

//create home route
app.get('/', (req,res) => {
	if (!req.user) {
		res.render('home');
	}
	else {
		res.redirect('/profile');
	}

})

app.get('/sched', (req,res) => {
	res.render('sched');
})

app.listen(3000, () => {
	console.log('app now listening for requests on port 3000');
})
