// !/usr/bin/nodemon;
// handler.js => addNoteHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler

const notes = require('./notes');
const {nanoid} = require('nanoid');

const  addNoteHandler = (request, h) => {
       // payload from client
       const {title, tags, body} = request.payload; // data yang kita dapatkan dari client
       const id = nanoid(16);

       const createdAt = new Date().toISOString(); // waktu pembuatan
       const updatedAt = createdAt; // waktu update

       const newNote = {
             title,tags,body,id,createdAt,updatedAt,
       };

       notes.push(newNote);

       // checking
       const isSuccess = notes.filter((note) => note.id === id).length > 0;
       console.log(notes);

       if(isSuccess){
           const response = h.response({
              status : 'Success',
              message: 'Catatan berhasil ditambahkan',
              data   : {
                        noteId: id,
                       },
           });
           response.code(201);
           return response;
       }

       const response = h.response({
             status : 'Fail',
             message: 'Catatan gagal ditambahkan',
       });
       response.code = 500;
       return response;

};

const getAllNotesHandler = () => ({
      status: 'Success',
     data : {
             notes,
            },
});

const getNoteByIdHandler = (request, h) => {
      const {id} = request.params; // dapatkan id
      const note = notes.filter((n)=> n.id === id)[0];

      if (note !== undefined){
         return {
                 status : 'Success',
                 data : {
                         note,
                       },
                };
      }
      const response = h.response({
         status  : 'fail',
         message : 'Catatan tidak ditemukan',
      });
      response.code(404);
      return response;
};

const editNoteByIdHandler = (request, h) => {
      /*
      fungsi edit pertama dapatkan id dari parameter
      dapatkan payload ubah tanggal, temukan index
      */
      const {id} = request.params;
      const {title, tags, body} = request.payload;
      const updatedAt = new Date().toISOString();

      const index = notes.findIndex((note) => note.id === id);
      if(index !== -1){
        notes[index] = {
                        ...notes[index],
                        title,
                        tags,
                        body,
                        updatedAt,
                       };
      };

      const response = h.response({
           status  : 'success',
           message : 'Catatan berhasil diperbaharui',
       });

      response.code(200);
      return response;
}

const  deleteNoteByIdHandler = (request, h) => {
       const {id} = request.params;

       const index = notes.findIndex((note)=> note.id === id);
       if(index !== -1){
           notes.splice(index,1);
           const response = h.response({
                status : 'success',
                message: 'Catatan berhasil dihapus',
           });
           response.code(200);
           return response;
       }
       const response = h.response({
               status : 'fail',
               message: 'Catatan gagal dihapus, Id tidak ditemukan',
       });
       response.code(404);
       return response;
}

module.exports = {
                   addNoteHandler,
                   getAllNotesHandler,
                   getNoteByIdHandler,
                   editNoteByIdHandler,
                   deleteNoteByIdHandler,
                  };

