import React from 'react';
import { Button, Text, View, TextInput, ScrollView, StyleSheet } from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'start project',
  };

  constructor(props) {
    super(props);
    this.state = {title: ''};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.base}>
          <View style={styles.itemContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>Title</Text>
            </View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="your project title"
              onChangeText={(text) => this.setState({
                title: text
              })}
            />
          </View>
        </View>
        <Button
          onPress={() => {
            this._onPress()
          }}
          title="Complete"
        />
      </ScrollView>
    );
  }

  _onPress= () => {
    this._saveProject();
    this.props.navigation.navigate('Home');
  };

  _saveProject= () => {
  };

}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  textInputStyle: {
    flex: 1,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
