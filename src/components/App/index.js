import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Profile from '../Profile';
import Header from '../Header';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

class App extends Component {

  state = { 
    isNavShown: false
  }

  setNavShown = (value) =>  {
    console.log(value);
    this.setState({ isNavShown: value });
  }


  render() {
    return (
      <Router>
        <div>
          <Header setNavShown={this.setNavShown}/>
          <Navigation setNavShown={this.setNavShown} isNavShown={this.state.isNavShown} />

          <hr />

          <Route
            exact
            path={ROUTES.LANDING}
            component={LandingPage}
          />
          {/* <Route path={ROUTES.SIGN_UP} component={SignUpPage} /> */}
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          {/* <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      /> */}
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.PROFILE} component={Profile} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
