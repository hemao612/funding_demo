import React from "react";
import {Text, View, StyleSheet, Alert, Modal} from 'react-native';
import {  Constants, BarCodeScanner, Permissions } from 'expo';
import PrimaryButton from "../components/PrimaryButton";
import Parse from "parse/react-native";

export default class ScannerScreen extends React.Component {

  state = {
    hasCameraPermission: null,
    modalVisible: false,
    rewardInfo: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    let rewardInfo = JSON.parse(data.data);
    this.setState({
      modalVisible: true,
      rewardInfo: rewardInfo,
    })
  };

  render() {
    return (
      <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
              this.setState({
                modalVisible: false,
                rewardInfo: null,
              })
            }}>
            {this._renderRewardInfo()}
          </Modal>
        {this.state.hasCameraPermission === null ?
            <Text>Requesting for camera permission</Text> :
            this.state.hasCameraPermission === false ?
              <Text>Camera permission is not granted</Text> :
               this.state.modalVisible === false ?
                <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{height: 200, width: 200}}/> :
                 <View/>
        }
      </View>
    );
  }

  _renderRewardInfo() {
    let rewardInfo = this.state.rewardInfo;
    const title = rewardInfo !== null ? rewardInfo.title : null;
    const userName = rewardInfo !== null ? rewardInfo.userName: null;
    const reward = rewardInfo !== null ? rewardInfo.reward : null;
    return (<View style={styles.container}>
      <Text>project: {title}</Text>
      <Text>supporter: {userName}</Text>
      <Text>reward: ${reward}</Text>
      <PrimaryButton onPress = {this._confirmReward}
                     style={styles.confirmButton}>
        Confirm
      </PrimaryButton>
    </View>)
  }

  _confirmReward = () => {
    let rewardInfo = this.state.rewardInfo;
    const userId = rewardInfo !== null ? rewardInfo.userId: null;
    const projectId = rewardInfo !== null ? rewardInfo.projectId: null;
    const reward = rewardInfo !== null ? rewardInfo.reward : null;
    if (userId && projectId && reward) {
      this._updateProject(projectId, reward);
      this._updateUser(userId);
    }
  };

  _updateProject = (projectId, reward) => {
    let project = Parse.Object.extend("Project");
    let query = new Parse.Query(project);
    query.equalTo('objectId', projectId);
    query.first().then((data) => {
      let funded = data.get('funded');
      let backers = data.get('backers');
      funded = parseInt(funded) + parseInt(reward);
      backers = parseInt(backers) + 1;
      data.set('funded', funded);
      data.set('backers', backers);
      data.save().then(() => {
        alert('success! congratulations!');
        this.props.navigation.goBack();
      });
    });
  };

  _updateUser = (userId) => {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  confirmButton: {
    padding: 15,
  }
});