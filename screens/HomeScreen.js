import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Parse from "parse/react-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'funding',
  };

  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("TheBuilder");
    Parse.serverURL = 'http://thebuilder.hk/parse';
    this.setState({
      isLoading: false,
      dataSource:  require('../test.json')
    });
  }

  render() {

    if(this.state.isLoading) {
      return (
        <View style={{flex:1, padding:20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource.project}
          ItemSeparatorComponent={this._separator}
          renderItem={({item}) => {
            return (<TouchableOpacity style={styles.itemContainer}
                              activeOpacity={0.8}
                              onPress={() => this.props.navigation.navigate('Details', {item})}>
                      <Text style={styles.titleContainer}> {item.title}</Text>
                      <Text style={styles.founderContainer}> {'by ' + item.founder}</Text>
                      <View style={styles.progressContainer}>
                        <Progress.Bar progress={item.progress} width={null} height={2}/>
                      </View>
                    </TouchableOpacity>)

            }
          }
        />
      </View>
    );
  }
  _separator = () => {
    return <View style={{height:0.3,backgroundColor:'grey'}}/>;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 22,
  },
  statusContainer: {
    backgroundColor: '#000'
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 22,
    paddingBottom: 22,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 22,
  },
  titleContainer: {
    flex: 1,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    paddingBottom: 8,
  },
  founderContainer: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 14,
    paddingLeft: 4,
  },
  progressContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
