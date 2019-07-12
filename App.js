import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Routes from './src/Router';
import OneSignal from 'react-native-onesignal';

export default class App extends Component {

  constructor() {
    super();
    OneSignal.init("44e7014d-b607-466c-b91d-f9799849f430");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.configure();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1c313a" barStyle="light-content"/>
        <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#455a64'
  }
});