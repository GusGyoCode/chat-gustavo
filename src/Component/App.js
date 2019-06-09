import React, { Component } from 'react';

//Documents
import './App.css';

//Components
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';

//packages
import firebase from 'firebase';
import {DB_CONFIG} from './Config/Config';
import 'firebase/database';

class App extends Component {
  constructor(){
    super();
    this.state = {
      notes: [
        /*{
          noteId: 1,
          title: 'tarea1',
          content: 'note 1',
          responsible: 'gustavo'
        },
        {
          noteId: 2,
          title: 'tarea2',
          content: 'note 2',
          responsible: 'gustavo'
        },
        {
          noteId: 3,
          title: 'tarea3',
          content: 'note 3',
          responsible: 'gustavo3'
        },*/
      ]
    };

    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');
  }

  componentDidMount(){
    const { notes } = this.state;
    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        title: snap.val().title,
        content: snap.val().content,
        responsible: snap.val().responsible
      })
      this.setState({ notes });
    });

    this.db.on('child_removed', snap =>{
      for(let i=0; i < notes.length; i++){
        if(notes[i].noteId = snap.key){
          notes.splice(i, 1);
        }
      }
      this.setState({ notes });
    })
  }

  addNote(title, content, responsible){
    /*let { notes } = this.state;
    notes.push({
      noteId: notes.length +1,
      title: title,
      content: content,
      responsible: responsible
    });
    this.setState({ notes });*/

    this.db.push().set({
      title: title, 
      content: content, 
      responsible: responsible
    });
  }

  removerNote(noteId){
    this.db.child(noteId).remove();
  }

  render(){
    return (
      <div className="AppContainer">
        <div className="NoteHeader">
          <h1>Note Gustavo</h1>
          <h2>Notificaciones - <i>{this.state.notes.length}</i></h2>
        </div>
        <div className="NoteBody">
          <NoteForm
          addNote={this.addNote.bind(this)}
          />
          <div className="NoteBody2">
            {
              this.state.notes.map(note =>{
                return(
                  <Note
                    title={note.title}
                    content={note.content}
                    responsible={note.responsible}
                    key={note.noteId}
                    noteId={note.noteId}
                    removerNote={this.removerNote.bind(this)}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
