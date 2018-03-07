import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Me',
  };

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.itemContainer}
                          activeOpacity={0.8}
                          onPress={() => this.props.navigation.navigate('Scanner')}>
          <Text>Scan QR code</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 22,
    paddingBottom: 22,
  },
});
