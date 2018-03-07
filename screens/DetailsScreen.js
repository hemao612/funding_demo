import React from 'react';
import { ScrollView, StyleSheet, Image, Text, View, TextInput, Button } from 'react-native';
import * as Progress from 'react-native-progress';

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {reward: ''};
  }

  render() {
    const { params } = this.props.navigation.state;
    const title = params ? params.item.title: null;
    const progress = params ? params.item.progress: null;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titleContainer}> {title}</Text>
        <View style={styles.progressContainer}>
          <Progress.Bar progress={progress} width={null} height={2} />
        </View>
        <TextInput
          style={styles.textInputStyle}
          placeholder="your reward"
          onChangeText={(text) => this.setState({
            reward: text
          })}
        />
        <Button
          onPress={() => {
            this._onPress()
          }}
          title="Support"
        />
      </ScrollView>
    );
  }

  _onPress() {
    this.props.navigation.navigate('QRCode', {
      reward: this.state.reward,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  progressContainer: {
    paddingTop: 20,
    paddingLeft: 4,
    paddingRight: 10,
    paddingBottom: 20,
  }
});