import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Header, Nav } from "./shared";
import { About, Home, Profile } from "./pages";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
});

class App extends Component {
  state = { isSignedIn: false,
            isShown: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
  };
  
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };

  setShowNav = (value: boolean): void => {
    this.setState({
      isShown: value
    })
  }


  render() {
    return (
      <div>
        <Header />
        <Nav
          isShown={this.state.isShown}
          setShown={this.setShowNav}
        ></Nav>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
        {this.state.isSignedIn ? (
          <span>
            <div>Log in successful. </div>
            <button onClick={() => firebase.auth().signOut()}>Log out</button>
            {/* Exclamation mark coerces not null types */}
            <h1> Welcome {firebase.auth().currentUser!.displayName}</h1>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}

      </div>
    );
  }
}

export default App;
