import React, { Component } from 'react';
import logo from '../trashcanlogo.png';
import classes from './login.module.css';
class Login extends Component {
  render() {
    return (
        <div className = {classes.page}>
            <div className = {classes.background}>
                <h1 className = {classes.title}>SIGN IN/ UP TO LOOK AT YOUR TRASHCAN DATA</h1>
            <img src = {logo} alt = "logo" className = {classes.logo}></img>
            <button onClick = {this.props.onSignInClick} className = {classes.button}>Sign In With Google</button>
            </div>
        </div>
    );
  }
}

export default Login;