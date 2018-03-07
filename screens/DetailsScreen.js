import React from 'react';
import { ScrollView, StyleSheet, Image, Text, View, TextInput, Button } from 'react-native';
import * as Progress from 'react-native-progress';
import Parse from "parse/react-native";

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      reward: '',
      currentUser: Parse.User.current(),
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    const title = params ? params.item.get('title') : null;
    const progress = params ? params.item.get('progress') : null;
    const imageUri = params ? params.item.get('image_uri') : null;
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.imageContainer}
               source={{uri:imageUri}}/>
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
    if (!this.state.currentUser) {
      alert('Please sign in ！');
      return;
    }
    const { params } = this.props.navigation.state;
    const title = params ? params.item.get('title') : null;
    const projectId = params ? params.item.id : null;
    const userName = this.state.currentUser.get('username');
    const userId = this.state.currentUser.id;
    this.props.navigation.navigate('QRCode', {
      reward: this.state.reward,
      title: title,
      projectId: projectId,
      userName: userName,
      userId: userId,
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
  },
  imageContainer: {
    backgroundColor: '#fff',
    height: 280,
    paddingTop: 22,
    resizeMode: Image.resizeMode.stretch,
  },
});