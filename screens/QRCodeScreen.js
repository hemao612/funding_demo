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
    const { params } = this.props.navigation.state;
    const reward = params ? params.reward: 0;
    return (<View style={styles.container}>
              <QRCode
                value={reward}
                size={200}
                bgColor='black'
                fgColor='white'/>
            </View>)
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