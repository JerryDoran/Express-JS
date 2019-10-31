const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// INITIALIZE MIDDLEWARE
// app.use(logger);

// HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HOME PAGE ROUTE. LOCALHOST:3000
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members: members
  })
);

// SET A STATIC FOLDER TO SERVE UP STATIC FILES
// If you move this line above the index route above then this homepage will
// render in the browser.  Normally will use view engine template routes like
// above in most applications.
app.use(express.static(path.join(__dirname, 'public')));

// MEMBERS API ROUTES
app.use('/api/members', require('./routes/api/members'));

// app.get('/', (req, res) => {
// Send a response back to the browser
// res.send('<h1>Hello World!!</h1>');
// res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
