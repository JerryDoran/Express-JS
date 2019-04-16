/* jshint esversion: 6 */

const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

// INITIALIZE MIDDLEWARE
// app.use(logger);

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// SET A STATIC FOLDER TO SERVE UP STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// MEMBERS API ROUTES
app.use('/api/members', require('./routes/api/members'));

// app.get('/', (req, res) => {
   // Send a response back to the browser
   // res.send('<h1>Hello World!!</h1>');
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
