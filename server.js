// Dependencies
const path = require('path');
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3030;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
// GET /notes should return the notes.html file.

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        let notes = JSON.parse(data);
        res.json(notes)
    });
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
    // read db file
    fs.readFile('db/db.json', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        let notes = JSON.parse(data);
        req.body.id = uuidv4();
        notes.push(req.body);
        fs.writeFile('db/db.json', JSON.stringify(notes), err => {
            if (err) {
                throw err;
            }
            res.json(notes);
        })
    });
});

// GET * should return the notes.html file.
// why do we need the *?
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Monday Night: left of trying to compare req.params.id to id's in the array by looping through.
// app.delete('/api/notes/:id', (req, res) => {
//     fs.readFile('db/db.json', 'utf8', function read(err, data) {
//         if (err) {
//             throw err;
//         }
//         let notes = JSON.parse(data);
   
//         let getId = () => {
//             notes.forEach(note => {
//                 if (note.id === req.params.id) {
//                     return false;
//                 }
//             });
//         }
//         console.log(getId);
//         let newArray = notes.filter(getId);
      
//         console.log(newArray);
//         // fs.writeFile('db/db.json', JSON.stringify(newArray), err => {
//         //     if (err) {
//         //         throw err;
//         //     }
//         //     res.json(newArray);
//         // })
//     });
// });




app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
