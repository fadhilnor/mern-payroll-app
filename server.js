// Import npm packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');

require('dotenv').config();
const app = express();

// Configure port
const PORT = process.env.PORT || 8080;

// Passport Config
require('./config/passport.local')(passport);

// DB Config
mongoose
  .connect(process.env.mongoURI || require('./config/keys').mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch((err) => console.log(err));

// Express body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// HTTP request logger
app.use(morgan('tiny'));

// Routes
const usersRouter = require('./routes/api/users');
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
