const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const usersRoutes = require('./Routes/users');
const postsRoutes = require('./Routes/posts/posts');
const searchRoutes = require('./Routes/search');
const chatRoutes = require('./Routes/chat');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/images/users', express.static(path.join('images/users')));
app.use('/images/posts', express.static(path.join('images/posts')));

mongoose.connect('mongodb+srv://Aritro:'+ process.env.MONGO_PW +'@cluster0.wmuv0.mongodb.net/socialNetwork?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('Connected to database.');
}).catch(() => {
  console.log('Connection failed.');
});

// app.use(cors({
//   origin: process.env.CORS_ORIGIN
// }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/chats', chatRoutes);

module.exports = app;