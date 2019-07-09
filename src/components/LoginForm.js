import React, { Component } from "react";
import { Text } from "react-native";
import firebase from 'firebase';
import { Button, Spinner, Input, Card, CardSection } from './common';

class LoginForm extends Component {
  state = { email: "", password: "", error: '', loading: false };

  // Helper method to initiate a user sign in from button press
  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });
    // Below - Attempts log in. First catch failure on promise to create an account
    firebase.auth().signInWithEmailAndPassword(email, password)
      // Success Login
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        // Create an account since login failed
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  // LOgin succeeded, so we clear out fields
  onLoginSuccess() {
    this.setState({ 
      email: '', 
      password: '', 
      error: '', 
      loading: false
    });
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    })
  }

  // Method to determine to render activity loading indicator or the login button
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            label="Email"
            placeholder="example@example.com"
            value={this.state.email}
            onChangeText={ email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input 
            label="Password"
            placeholder="password"
            value={this.state.password}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <Text style={styles.errorStyle}>{this.state.error}</Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}


export default LoginForm;