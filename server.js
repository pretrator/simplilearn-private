const express = require('express');
const connectToDB = require('./utils/dbConnection');
const cors = require('cors');
const path = require("path");
const config = require('./config');

const app = express();
app.use(cors());

app.use(express.json({extended:false}));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

connectToDB().then(() => {
    app.listen(config.PORT, () => console.log(`Server started on port ${config.PORT}`));
});