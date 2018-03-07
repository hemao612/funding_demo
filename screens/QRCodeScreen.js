import React from "react";
import { View, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode';

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'QRCode',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (<View style={styles.container}>
              <QRCode
                value={this._constructRewardInfo()}
                size={200}
                bgColor='black'
                fgColor='white'/>
            </View>)
  }

  _constructRewardInfo = () => {
    const { params } = this.props.navigation.state;
    const reward = params ? params.reward: 0;
    const title = params ? params.title: null;
    const projectId = params ? params.projectId: null;
    const userName = params ? params.userName: null;
    const userId = params ? params.userId: null;
    const rewardInfo = {
      reward: reward,
      title: title,
      projectId: projectId,
      userName: userName,
      userId: userId,
    };
    return JSON.stringify(rewardInfo) ;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});