import React, { Component } from 'react';
import Login from './login/login';
import firebase, {auth, provider} from './firebase.js';
import {Route, Redirect} from 'react-router-dom';
import Homepage from './homepage/homepage';
import Toolbar from './toolbar/toolbar';
import DownloadData from './downloaddata/downloaddata';
import Trashlytics from './trashlytics/trashlytics';
import Footer from './footer/footer';

class App extends Component {
  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user:user });
        this.setState({redirectHomepage: true});
        this.setState({redirectHomepage: false});
      } 
      else{
        this.setState({redirectSignIn: true});
        this.setState({redirectHomepage: false});
      }
      const users = firebase.database().ref('users');
      users.orderByChild('email').equalTo(this.state.user.email).on('child_added', (result)=>{
        console.log(result.val());
        this.setState({trashCanData: result.val()});
      });
      users.orderByChild('email').equalTo(this.state.user.email).on('child_changed', (result)=>{
        users.orderByChild('email').equalTo(this.state.user.email).on('child_added', (result)=>{
          console.log(result.val());
          this.setState({trashCanData: result.val()});
        });
      });
    });
    if(this.state.user){
      //in case auth state has not changed
      const users = firebase.database().ref('users');
      users.orderByChild('email').equalTo(this.state.user.email).on('child_added', (result)=>{
        console.log(result.val());
        this.setState({trashCanData: result.val()});
      });
      users.orderByChild('email').equalTo(this.state.user.email).on('child_changed', (result)=>{
        users.orderByChild('email').equalTo(this.state.user.email).on('child_added', (result)=>{
          console.log(result.val());
          this.setState({trashCanData: result.val()});
        });
      });
    }
  }
  onSignInClick =() =>{
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({user: user});
      this.setState({redirectHomepage: true});
      this.setState({redirectSignIn: false});
    });
  }
  onSignOutClick = () =>{
    auth.signOut().then((result) => {
      this.setState({user: null});
      this.setState({redirectSignIn: true});
      this.setState({redirectHomepage: false});
      this.setState({trashCanData: null});
    });
  }
  state = {
    user: null,
    redirectHomepage: false,
    redirectSignIn: false,
    database: null,
    trashCanData: null
  }

  render() {
    return (
      <div>
        {this.state.user?<Toolbar photoUrl = {this.state.user?this.state.user.photoURL:null} onSignOutClick = {this.onSignOutClick}/>: null}
        {this.state.redirectHomepage ? <Redirect to = "/" />: null}
        {this.state.redirectSignIn ? <Redirect to = "/signin" />: null}
        <Route path = "/signin"><Login onSignInClick = {this.onSignInClick}></Login></Route>
        <Route path = "/downloaddata"><DownloadData json = {this.state.trashCanData}></DownloadData></Route>
        <Route exact path = "/"><Homepage trashCanData = {this.state.trashCanData} user = {this.state.user}></Homepage></Route>
        <Route path = '/trashlytics'><Trashlytics trashCanData = {this.state.trashCanData} user = {this.state.user}></Trashlytics></Route>
        {this.state.user?<Footer></Footer>:null}
      </div>
    );
  }
}

export default App;