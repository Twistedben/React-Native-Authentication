import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import { CardSection, Header, Button, Spinner } from "./components/common";
import LoginForm from "./components/LoginForm";


class App extends Component {
  state = { loggedIn: null };

  // Lifecycle method to load Firebase
  // Secret in code
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    });

    // Checks if the user is actually signed in or signed out
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    }); 
  }
  // Helper function to determine if log in form is showed
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{ height: 40, paddingTop: 10}}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
