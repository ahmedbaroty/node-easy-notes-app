const Note = require('../models/note.model.js');

//----------------------------
// Creating anew Note
//----------------------------

// create and save anew Note
exports.create = (req, res) => {
    // validate Request
    if (!req.body.content) {
        return res.status(400).send({message: 'Note content can not be empty'})
    }

    // create Note
    const note = new Note({
        title: req.body.title || 'untitled Note',
        content: req.body.content
    });

    note.save().then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({message: error.message || "Some error occurred while creating the Note."})
    });

};

//----------------------------
// Retrieving all Notes
//----------------------------

//retrieve and return all notes from db
exports.findAll = (req, res) => {
    Note.find().then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving notes."
        });
    });
};

//----------------------------
// Retrieving a single Note
//----------------------------

exports.findOne = (req, res) => {

    Note.findById(req.params.noteId).then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(error => {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        } else {
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        }
    });
};

//----------------------------
// Updating a single Note
//----------------------------

// update a note identified by the noteId in the request
exports.update = (req, res) => {
    // validate request
    if (!req.body.content) {
        return res.status(400).send({message: 'Note content can not be empty'});
    }
    // find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};
//----------------------------
// Deleting a Note
//----------------------------

// delete a note with the specific noteId in the request
exports.delete = (req , res) =>{
  Note.findByIdAndRemove(req.params.noteId).then(note => {
      if(!note){
          res.status(404).send({message: 'Note not found with id ' + req.params.noteId});
      }
      res.send({message: 'Note is deleted Successfully'});
  }).catch(error=> {
      if(error.kind === 'ObjectId'){
          res.status(404).send({message: 'Note not found with id ' + req.params.noteId});
      }

      res.status(500).send({message: 'Could not delete note with id ' + req.params.noteId});
  });

};