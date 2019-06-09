import React, { Component } from 'react';

//Documents
import './NoteForm.css';

class NoteForm extends Component{
  addNote(){
    this.props.addNote(this.textTitle.value, this.textContent.value, this.textResponsible.value);
    this.textTitle.value = "";
    this.textContent.value = "";
    this.textResponsible.value = "";
    this.textTitle.focus();
  }
  render(){
    return(
      <div className="NoteForm">
        <h2>Agrega una Nota</h2>
        <input
        ref={title => {this.textTitle = title;}}
        name="title"
        type="text"
        placeholder="Titulo"/>
        <textarea
        ref={content => {this.textContent = content;}}
        name="content" 
        id="" 
        cols="30" 
        rows="10" 
        placeholder="Descripcion">
        </textarea>
        <input
        ref={responsible => {this.textResponsible = responsible;}}
        name="responsible" 
        type="text"
        placeholder="Responsable"/>
        <button
        onClick={this.addNote.bind(this)}
        >Agregar Nota</button>
      </div>
    );
  }
}

export default NoteForm;