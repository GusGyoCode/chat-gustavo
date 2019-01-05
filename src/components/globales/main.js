import React, {Component} from 'react';
import firebase from 'firebase';

import './css/main.css';

class FileUpload extends Component{
  constructor(){
    super();
    this.state = {
      uploadValue: 0,
      picture: null
    };
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload (event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.log(error.message);
    }, ()=>{
      this.setState({
        uploadValue: 100
      });
      storageRef.getDownloadURL().then(url =>{
        this.setState({
          picture: url
        });
      })
    });
  }
  
  render(){
    return(
      <div className="main">
      <progress value={this.state.uploadValue} max="100">
      {this.state.uploadValue} %
      </progress>
      <br/>
      <input type="file" onChange={this.handleUpload}/>
      <br/>
      <img width="320px" src={this.state.picture} alt=""/>
      </div>
    )
  }
}

export default FileUpload;