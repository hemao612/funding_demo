/* @flow */

import React from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import EmptyProfileProjectsNotice from './EmptyProfileProjectsNotice';
import Parse from 'parse/react-native'

export default class Profile extends React.Component {

  _isMounted: boolean;

  state = {
    user: Parse.User.current(),
  };

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <ScrollView
        style={styles.container}>
        {this._renderHeader()}
        {this._renderApps()}
      </ScrollView>
    );
  }

  _renderHeader = () => {
    let currentUser = Parse.User.current();
    let firstName = currentUser.get('firstname');
    let lastName = currentUser.get('lastname');
    let username = currentUser.get('username');

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

  _logOut = () => {
    Parse.User.logOut().then(() => {
      this.setState({
        user: Parse.User.current(),
      })
    });
  };

  _renderApps = () => {
    // if (!apps || !apps.length) {
      return <EmptyProfileProjectsNotice {...this.props}/>;
    // } else {
    //   // let appsToDisplay = take(apps, MAX_APPS_TO_DISPLAY);
    //   let otherApps = takeRight(apps, Math.max(0, apps.length - MAX_APPS_TO_DISPLAY));
    //
    //   return (
    //     <View>
    //       <View style={[SharedStyles.sectionLabelContainer, { marginTop: 10 }]}>
    //         <Text style={SharedStyles.sectionLabelText}>PROJECTS</Text>
    //       </View>
    //
    //       {take(apps, 3).map(this._renderApp)}
    //       <SeeAllProjectsButton
    //         apps={otherApps}
    //         appCount={appCount - 3}
    //         label="See all projects"
    //         onPress={this._handlePressProjectList}
    //       />
    //     </View>
    //   );
    // }
  };

  // _handlePressProjectList = () => {
  //   this.props.navigator.push('projectsForUser', {
  //     username: this.props.username,
  //     belongsToCurrentUser: this.props.isOwnProfile,
  //   });
  // };
  //
  // _renderApp = (app: any, i: number) => {
  //   return (
  //     <SmallProjectCard
  //       key={i}
  //       hideUsername
  //       iconUrl={app.iconUrl}
  //       likeCount={app.likeCount}
  //       projectName={app.name}
  //       slug={app.packageName}
  //       projectUrl={app.fullName}
  //       privacy={app.privacy}
  //       fullWidthBorder
  //     />
  //   );
  // };
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
});
