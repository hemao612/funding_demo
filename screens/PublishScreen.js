/* @flow */

import React from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';
import Form from '../components/Form';
import PrimaryButton from '../components/PrimaryButton';

export default class PublishScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Publish',
    },
  };

  state = {
      keyboardHeight: 0,
      title : '',
      aim : '',
      ddl : '',
      isLoading: false,
    };

  _isMounted: boolean;
  _keyboardDidShowSubscription: { remove: Function };
  _keyboardDidHideSubscription: { remove: Function };

  componentDidMount() {
    this._isMounted = true;

    this._keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      ({ endCoordinates }) => {
        const keyboardHeight = endCoordinates.height;
        this.setState({ keyboardHeight });
      }
    );

    this._keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardHeight: 0 });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;

    this._keyboardDidShowSubscription.remove();
    this._keyboardDidHideSubscription.remove();
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ paddingTop: 20 }}
        keyboardShouldPersistTaps="always"
        style={styles.container}>
        <Form>
          <Form.Input
            onChangeText={this._updateValue.bind(this, 'title')}
            onSubmitEditing={() => this._handleSubmitEditing('title')}
            value={this.state.title}
            autoFocus
            autoCorrect={false}
            autoCapitalize="words"
            keyboardType="default"
            label="Title"
            returnKeyType="next"
          />
          <Form.Input
            ref={view => {
              this.title = view;
            }}
            onChangeText={this._updateValue.bind(this, 'aim')}
            onSubmitEditing={() => this._handleSubmitEditing('aim')}
            value={this.state.aim}
            autoCorrect={false}
            autoCapitalize="words"
            keyboardType="default"
            label="Aim"
            returnKeyType="next"
          />
          <Form.Input
            ref={view => {
              this.aim = view}}
            onChangeText={this._updateValue.bind(this, 'deadline')}
            onSubmitEditing={() => this._handleSubmitEditing('deadline')}
            value={this.state.ddl}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            label="deadline"
            returnKeyType="next"
          />
        </Form>

        <PrimaryButton
          style={{ margin: 20 }}
          onPress={this._handleSubmit}
          isLoading={this.state.isLoading}>
          Confirm
        </PrimaryButton>

        <View style={{ height: this.state.keyboardHeight }} />
      </ScrollView>
    );
  }

  title: any;
  aim: any;

  _handleSubmitEditing = (field: string) => {
    switch (field) {
      case 'title':
        this.title.focus();
        break;
      case 'aim':
        this.aim.focus();
        break;
    }
  };

  _updateValue = (key: string, value: string) => {
    this.setState({ [key]: value });
  };

  _handleSubmit = async () => {
    l
  };

  _handleError = (result: any) => {
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyBackground,
  },
});