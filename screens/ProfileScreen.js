import React from 'react';
import {
  ActivityIndicator,
  Button, Image,
  ScrollView,
  StyleSheet, Text, View,
  DeviceEventEmitter, FlatList, TouchableOpacity,
  Platform,
} from 'react-native';
import {Parse} from 'parse/react-native';
import { Ionicons } from '@expo/vector-icons';

import ProfileUnauthenticated from '../components/ProfileUnauthenticated';
import Colors from "../constants/Colors";
import EmptyProfileProjectsNotice from "../components/EmptyProfileProjectsNotice";
import Events from "../constants/Events"
import QRCodeButton from "../components/QRCodeButton";


export default class ProfileScreen extends React.Component {

  state = {
    currentUser: Parse.User.current(),
    projects: null,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
    }
  };

  componentDidMount() {
    this.listner=DeviceEventEmitter.addListener(Events.LOGGED_IN, (e)=>{
      this.setState({
        currentUser: e,
      })
    });
  }

  componentWillUnmount() {
    this.listner.remove();
  }

  render() {
    if (!this.state.currentUser) {
      return <ProfileUnauthenticated {...this.props} />
    } else {
      return this._renderProfile();
    }
  }

  _renderProfile = () => {
    if(this.state.currentUser) {
      let userProjects = this.state.currentUser.get('projects');
      if(!this.state.projects && userProjects){
        this._queryPorjects(userProjects);
      }
    }
    return (
      <ScrollView
        style={styles.container}>
        {this._renderHeader()}
        {this._renderProjects()}
      </ScrollView>
    );
  };

  _queryPorjects = (userProjects) => {
    let projectIds = [];
    for (let i=0; i<userProjects.length; i++) {
      let projectId = userProjects[i].projectId;
      projectIds.push(projectId);
    }
    let projectsTable = Parse.Object.extend("Project");
    let query = new Parse.Query(projectsTable);
    query.containedIn('objectId', projectIds);
    query.find().then((data) => {
      this.setState({
        projects: data,
      });
    });
  };

  _renderHeader = () => {
    let firstName = this.state.currentUser.get('firstname');
    let lastName = this.state.currentUser.get('lastname');
    let username = this.state.currentUser.get('username');

    return (
      <View style={styles.header}>
        <View style={styles.headerAvatarContainer}>
          <Image style={styles.headerAvatar} source={require('../assets/images/ic_my.png')} />
        </View>
        <Text style={styles.headerFullNameText}>
          {firstName} {lastName}
        </Text>
        <View style={styles.headerAccountsList}>
          <Text style={styles.headerAccountText}>@{username}</Text>
        </View>
        <Button
          title={'Sign Out'}
          color={Colors.tintColor}
          onPress={this._logOut}
        />
      </View>
    );
  };

  _renderProjects = () => {
    let projectIds = this.state.currentUser.get('projects');
    if (!this.state.projects && !projectIds) {
      return <EmptyProfileProjectsNotice {...this.props}/>;
    } else if (!this.state.projects && projectIds) {
      return (<View style={{flex:1, padding:20}}>
                <ActivityIndicator/>
              </View>);
    } else {
      return (<View>
        <Text>Your projects</Text>
        <FlatList
          data = {this.state.projects}
          keyExtractor = {this._keyExtractor}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.projectContainer}
                                  activeOpacity={0.8}
                                  onPress={() => this.props.navigation.navigate('Details', {item})}>
                <Image style={styles.projectImage}
                     source={require('../assets/images/demo1.png')}/>
                <View style={styles.titleContainer}>
                  <Text style={styles.projectTitle}>{item.get('title')}</Text>
                </View>
              </TouchableOpacity>)
          }}/>
        <View style={styles.scannerContainer}>
          <QRCodeButton
            {...this.props}/>
        </View>
      </View>);
    }
  };

  _keyExtractor = (item, index) => item.id;

  _logOut = () => {
    Parse.User.logOut().then(() => {
      this.setState({
        currentUser: null,
      })
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greyBackground,
    marginTop: -1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.separator,
    borderBottomWidth: 1,
    borderBottomColor: Colors.separator,
  },
  headerAvatarContainer: {
    marginTop: 20,
    marginBottom: 12,
    overflow: 'hidden',
    borderRadius: 5,
  },
  headerAvatar: {
    height: 64,
    width: 64,
    borderRadius: 5,
  },
  legacyHeaderAvatar: {
    backgroundColor: '#eee',
  },
  headerAccountsList: {
    paddingBottom: 20,
  },
  headerAccountText: {
    color: 'rgba(36, 44, 58, 0.4)',
    fontSize: 14,
  },
  headerFullNameText: {
    color: '#232B3A',
    fontSize: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
  },
  projectContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  projectImage: {
    width: 40,
    height: 40,
  },
  projectTitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  titleContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  scannerContainer: {
    flexDirection: 'row',
  },
  scannerIcon: {
    paddingLeft: 5,
    paddingTop: 5,
  }
});
