import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
const querystring = require('querystring');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../actions/index';

// import 'src/assets/stylesheets/base.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authenticated: false
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin(e) {
    e.preventDefault();
    const userObj = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://localhost:8888/api/login', querystring.stringify(userObj))
      .then(res => {
        this.setState({ authenticated: true });
        this.props.loginUser(userObj);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { authenticated } = this.state;
    if (!authenticated) {
      return (
        <div>
          <h2>Login</h2>
          <form onSubmit={this.handleLogin}>
            <input
              onChange={this.handleEmail} 
              placeholder='Email' 
              type='email'
            />
            <input 
              onChange={this.handlePassword}
              placeholder='Password' 
              type='password'
            />
            <button type='submit'>Login</button>
          </form>
        </div>
      );
    } else {
      return (
        <Redirect to='/app' />
      );
    }
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
