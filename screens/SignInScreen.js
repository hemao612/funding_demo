import React from 'react';
import { ScrollView, StyleSheet, TextInput, DeviceEventEmitter } from 'react-native';

import Colors from '../constants/Colors';
import PrimaryButton from '../components/PrimaryButton';
import Form from '../components/Form';
import Parse from 'parse/react-native'
import Events from "../constants/Events";

const DEBUG = false;

export default class SignInScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Sign In',
    },
  };

  state = DEBUG
    ? {
        email: 'testing@getexponent.com',
        password: 'pass123',
        isLoading: false,
      }
    : {
        email: '',
        password: '',
        isLoading: false,
      };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: 15 }}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag">
        <Form>
          <Form.Input
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            keyboardType="email-address"
            label="E-mail or username"
            onChangeText={this._handleChangeEmail}
            onSubmitEditing={this._handleSubmitEmail}
            returnKeyType="next"
            value={this.state.email}
          />
          <Form.Input
            hideBottomBorder
            label="Password"
            ref={view => {
              this._passwordInput = view;
            }}
            onChangeText={this._handleChangePassword}
            onSubmitEditing={this._handleSubmitPassword}
            returnKeyType="done"
            secureTextEntry
            value={this.state.password}
          />
        </Form>

        <PrimaryButton
          isLoading={this.state.isLoading}
          style={{ margin: 20 }}
          onPress={this._handleSubmit}>
          Sign In
        </PrimaryButton>
      </ScrollView>
    );
  }

  _passwordInput: TextInput;

  _handleSubmitEmail = () => {
    this._passwordInput.focus();
  };

  _handleSubmitPassword = () => {
    this._handleSubmit();
  };

  _handleChangeEmail = (email: string) => {
    this.setState({ email });
  };

  _handleChangePassword = (password: string) => {
    this.setState({ password });
  };

  _handleSubmit = async () => {
    this.setState({
      isLoading: true
    });
    Parse.User.logIn(this.state.email, this.state.password).then((user) => {
      this.props.navigation.goBack();
      DeviceEventEmitter.emit(Events.LOGGED_IN, user);
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyBackground,
  },
});
