module.exports = (app) => {
    const notes = require('../controllers/note.controller');

    // create note
    app.post('/notes' , notes.create);

    // Retrieving All Notes
    app.get('/notes' , notes.findAll);

    // Retrieving single Note
    app.get('/notes/:noteId' , notes.findOne);

    // update note
    app.put('/notes/:noteId' , notes.update);

    // remove note
    app.delete('/notes/:noteId' , notes.delete);

};