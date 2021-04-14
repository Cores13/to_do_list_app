const express = require('express');

//express app
const app = express();

//listen for requiests
app.listen(3000);

// listening on localhost:3000/
app.get('/', (req, res)=>{
    res.sendFile('./views/index.html', {root: __dirname});
});

//404 page
app.use((req, res)=>{
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});