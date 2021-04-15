// Dependencies
const http = require('http');
const path = require('path');
const express = require('express');
const fs = require('fs');

const PORT = 3030;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
    // GET * should return the notes.html file.



app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
    // GET /notes should return the notes.html file.

app.get('/api/notes', (req, res) => {
    // GET /api/notes should read the db.json file and return all saved notes as JSON.
});

app.post('/api/notes', (req, res) => {});
    // POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).




app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

// // When someone visits the "http://localhost:8080/portfolio" path, this function is run.
// const displayNotes = (res) => {
//     fs.readFile(`${__dirname}/index.html`, (err, data) => {
//         if (err) throw err;
  
//     // Configure the response to return a status code of 200 (meaning everything went OK), and to be an HTML document
//     res.writeHead(200, { 'Content-Type': 'text/html' });
  
//     // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
//     res.end(myHTML);
//   });
// }
  
//   // When someone visits the "http://localhost:8080/" path, this function is run.
//   const displayRoot = (res) => {
//     fs.readFile(`${__dirname}/index.html`, (err, data) => {
//         if (err) throw err;
  
//     // Configure the response to return a status code of 200 (meaning everything went OK), and to be an HTML document
//     res.writeHead(200, { 'Content-Type': 'text/html' });
  
//     // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
//     res.end(myHTML);
//   });
// }
//   // When someone visits any path that is not specifically defined, this function is run.
//   const display404 = (url, res) => {
//     fs.readFile(`${__dirname}/index.html`, (err, data) => {
//         if (err) throw err;
  
//     // Configure the response to return a status code of 404 (meaning the page/resource asked for couldn't be found), and to be an HTML document
//     res.writeHead(404, { 'Content-Type': 'text/html' });
  
//     // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
//     res.end(myHTML);
//   });
// }
  
//   // Create a function which handles incoming requests and sends responses
  
//   const handleRequest = (req, res) => {
//     // Capture the url the request is made to
//     const path = req.url;
  
//     // Depending on the URL, display a different HTML file.
//     switch (path) {
//       case '/':
//         return displayRoot(res);
  
//       case '/portfolio':
//         return displayNotes(res);
  
//       default:
//         return display404(path, res);
//     }
//   };
  
//   // Assign our createServer method to a variable called "server"
//   const server = http.createServer(handleRequest);
  
//   // Start our server
//   server.listen(PORT, () => {
//     // Callback triggered when server is successfully listening. Hurray!
//     console.log(`Server listening on: http://localhost:${PORT}`);
//   });
  
