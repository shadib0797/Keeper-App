require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.66ao9.mongodb.net/keeperDB`);

const noteSchema = new mongoose.Schema({
    title : String,
    content : String
  });


const Note = mongoose.model('Note', noteSchema);

const note1 = new Note({
    title:"Delegation",
    content:"Q. How many programmers does it take to change a light bulb? A. None – It’s a hardware problem"
});

const note2 = new Note({
    title:"Loops",
    content:"How to keep a programmer in the shower forever. Show him the shampoo bottle instructions: Lather. Rinse. Repeat."
});

const note3 = new Note({
    title:"Arrays",
    content:"Q. Why did the programmer quit his job? A. Because he didn't get arrays."
});

// Note.insertMany([note1, note2, note3], (err)=>{
//     if(err){
//         console.log(err);
//     }
// });


app.route("/api")
.get(function(req, res){
    Note.find({}, function(err, foundNotes){
        res.json(foundNotes);
    })
})
.post(function(req, res){
    const {title, content} = req.body;
    const newNote = new Note({
        title:title,
        content:content
    });
    newNote.save();
})
.delete(function(req, res){
    Note.findByIdAndDelete(req.body.id, function(err){
        if(!err){
            res.send("successfully Deleted the item");
        }else{
            res.send(err);
        }
    });
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/client/build'));
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/client/build/index.html');
    })
  }
  

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port: ${port}`));