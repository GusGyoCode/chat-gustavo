import React, { Component } from 'react';
import './Note.css';

class Note extends Component{

  handleRemove(id){
    const remover = window.confirm('Estas seguro que deseas eliminarlo?');
    if(remover){
      this.props.removerNote(id);
    }
  }

  render(){
    return(
      <div className="Note">
        <h3>{this.props.title}</h3>
        <p>{this.props.content}</p>
        <h4>{this.props.responsible}</h4>
        <button
        onClick={() => this.handleRemove(this.props.noteId)}
        >Borrar</button>
      </div>
    );
  }
}

export default Note;