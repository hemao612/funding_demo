/* @flow */

import React from 'react';
import { Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import requestCameraPermissionsAsync from '../utils/requestCameraPermissionsAsync';

export default class QRCodeButton extends React.Component {
  render() {
    let { fullWidthBorder } = this.props;

    return (
      <TouchableOpacity
        onPress={this._handlePressAsync}
        underlayColor="#b7b7b7"
        style={[styles.container, fullWidthBorder && styles.bottomBorder]}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-qr-scanner' : 'md-qr-scanner'}
            size={28}
            color="#888"
          />
        </View>

        <View style={[styles.infoContainer, !fullWidthBorder && styles.bottomBorder]}>
          <Text style={styles.titleText} ellipsizeMode="tail" numberOfLines={1}>
            Scan QR Code
          </Text>

          <View style={styles.subtitlecontainer}>
            <Text style={styles.subtitleText} ellipsizeMode="tail" numberOfLines={1}>
              Scan funded code
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _handlePressAsync = async () => {
    // note(brentvatne): navigation should do this automatically
    Keyboard.dismiss();

    if (await requestCameraPermissionsAsync()) {
      this.props.navigation.navigate('QRScanner');
    } else {
      alert('In order to use the QR Code scanner you need to provide camera permissions');
    }
  };
}

const styles = StyleSheet.create({
  bottomBorder: {
    flexGrow: 1,
    borderBottomColor: Colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 5,
    flex: 1,
  },
  iconContainer: {
    width: 50,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    paddingTop: 13,
    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingBottom: 10,
  },
  titleText: {
    color: Colors.blackText,
    fontSize: 15,
    marginRight: 70,
    marginBottom: 2,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '400',
        marginTop: 1,
      },
    }),
  },
  subtitleText: {
    marginRight: 5,
    flex: 1,
    color: Colors.greyText,
    fontSize: 13,
  },
  subtitlecontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 1,
  },
});
