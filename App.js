/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import Recorder from './view/recordaudio';
// import db from './database/index'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default  class APP extends Component {
  constructor(props) {
    super(props);
    // const { setParams } = this.props.navigation;
    // setParams({title: '首页', headerTitle: '首页'});
  // }
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //       headerTitle: '首页'
  //   };
};
  _pressBtn() {
    
    this.props.navigation.push('myScroll', {id: Math.floor(Math.random() * 100)});
    console.log(this.props.navigation);
  }
  render() {
    return (
      <SafeAreaView style={{width: '100%', height: '100%'}}>
        <View style={{width: '100%', height: '100%'}}>
          <Recorder changeRoute={this._pressBtn.bind(this)}></Recorder>
          <View>
          {/* <Button title="to scroll" onPress={this._pressBtn.bind(this)}>
          </Button> */}
        </View>
        </View>
      </SafeAreaView>
    );
  }
};
