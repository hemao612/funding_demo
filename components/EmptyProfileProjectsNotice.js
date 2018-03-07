/* @flow */

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { WebBrowser } from 'expo';

import Colors from '../constants/Colors';
import PrimaryButton from './PrimaryButton';
import SharedStyles from "../constants/SharedStyles";

export default class EmptyProfileProjectsNotice extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={SharedStyles.noticeDescriptionText}>
          Projects that you publish will appear here! Go ahead and publish one, then refresh this
          screen.
        </Text>

        <PrimaryButton plain onPress={this._handlePublishProject} fallback={TouchableOpacity}>
          Publish
        </PrimaryButton>
      </View>
    );
  }

  _handlePublishProject = () => {
    this.props.navigation.navigate('Publish');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyBackground,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
