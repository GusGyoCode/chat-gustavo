import React, { Component } from 'react';
import firebase from 'firebase';

import Main from './main';
import './css/header.css';

class Header extends Component{
  constructor(){
    super();
    this.state = {
      user: null
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`Error ${error.code}: ${error.messages}`));
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido`))
      .catch(error => console.log(`Error ${error.code}: ${error.messages}`));
  }

  renderLoginButton(){
    //si el usuario esta logueado
    if (this.state.user) {
      return(
        <div>
          <img width="100px" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>hola {this.state.user.displayName}</p>
          <button onClick={this.handleLogout}>Salir</button>
          <Main/>
        </div>
      );
    } else {
      //si no lo esta
      return(
        <button onClick={this.handleAuth}>Login con google</button>
      );
    }
  }

  render(){
    return(
      <div className="header">
        <div className="contenedor">
          <h1 className="titulo_header">Titulo</h1>
          <div className="login">{this.renderLoginButton()}</div>
        </div>
      </div>
    )
  }
}
export default Header;