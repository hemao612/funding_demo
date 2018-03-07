import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
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

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let project = Parse.Object.extend("Project");
    let query = new Parse.Query(project);
    query.find().then((data) => {
        this.setState({
          isLoading: false,
          dataSource: data,
        });
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
          data={this.state.dataSource}
          ItemSeparatorComponent={this._separator}
          extraData={this.state}
          keyExtractor = {this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

  _renderItem = ({item}) => (
    <ProjectItem
      item={item}
      {...this.props}
    />
  );

  _keyExtractor = (item, index) => item.id;

  _separator = () => {
    return <View style={{height:0.3,backgroundColor:'grey'}}/>;
  };
}

class ProjectItem extends React.PureComponent {
  render() {
    const item = this.props.item;
    let funded = parseFloat(item.get('funded'));
    let aim = parseFloat(item.get('aim'));
    let progress = funded/aim;
    let progressPercent = progress * 100;
    return (<TouchableOpacity style={styles.itemContainer}
                              activeOpacity={0.8}
                              onPress={() => this.props.navigation.navigate('Details', {item})}>
      <Image style={styles.imageContainer}
             source={{uri:item.get('image_uri')}}/>
      <Text style={styles.titleContainer}> {item.get('title')}</Text>
      <Text style={styles.founderContainer}> {'by ' + item.get('founder')}</Text>
      <View style={styles.progressContainer}>
        <Progress.Bar progress={progress} width={null} height={2}/>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{progressPercent + '%\nfunded'}</Text>
        <Text style={styles.descriptionText}>{item.get('backers') + '\nbackers'}</Text>
        <Text style={styles.descriptionText}>{'99 \ndays to go'}</Text>
      </View>
    </TouchableOpacity>)
  }
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
    backgroundColor: '#fff',
    height: 280,
    paddingTop: 22,
    resizeMode: Image.resizeMode.stretch,
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
  descriptionContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 8,
  },
  descriptionText: {
    flex:1,
    fontSize:10,
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
