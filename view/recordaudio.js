import React, { Component } from 'react';
import { StyleSheet, View, Button, Text,Alert, AppState, ToastAndroid, ScrollView} from 'react-native';
import { Buffer } from 'buffer';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
// import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
// import realm from '../database/index';
import ActionButton from 'react-native-circular-action-menu';



export default connect(state => {
	return {
        originalip: state.setipreducer.ip,
		siteIP: `ws://${state.setipreducer.ip}/audio_stream`
	}
})(class App extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigate;
    this.state = {
      WSurl: '',
      audioFile: '',
      siteIP: `ws://${props.siteIP}/audio_stream`,
      recording: false,
      loaded: false,
      paused: true,
      recResultTextList: [],
      socketSuccess: false
    };
    // let resu = realm.objects('IP');
    // resu.forEach(ip => {
    //   this.state.WSurl = ip.address;
    // });
    console.log(this);
  }
  sound = null;
  ws = null;
  limit =  100000000;
  componentWillMount() {
    this.initWS();
    AppState.addEventListener('change', this.handleAppStateChange);
    // Realm.open(
    //   {schema: ['IP']}
    // ).then(realm => {
    //   let resu = realm.objects('IP');
    //   console.log(resu);
    // });
  };
  componentWillUnmount() {
    //删除状态改变事件监听
      AppState.removeEventListener('change', this.handleAppStateChange);
  };
  // shouldComponentUpdate(newProps, newState) {
  //   if (!(newProps.siteIP === newState.WSurl)) {
  //     this.initWS();
  //   }
  //   return  false;
  // };
  //状态改变响应
  handleAppStateChange(appState) {
      // alert('当前状态为:'+appState);
    //   console.log(111, appState);
    //   console.log(this);
    //   if (appState == 'background') {
    //       this.stop();
    //   }
  };
  componentWillReceiveProps(nextProps) {
        if (nextProps.siteIP !== this.state.siteIP) {
            console.log(1);
            this.setState({
                siteIP: nextProps.siteIP
            })
            this.initWS(nextProps.siteIP);
        }
  }
  async componentDidMount() {
    await this.checkPermission();
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };
    AudioRecord.init(options);
    AudioRecord.on('data', data => {
    //   const chunk = Buffer.from(data, 'base64');
    //   let strchunk = JSON.stringify(chunk);
    //   console.log(data, chunk);
      if (this.ws && this.state.socketSuccess) {
          // console.log(data);
          this.ws.send(data);
      }
      // do something with audio chunk
    });
  };
  initWS(ip) {
      let url = ip ? ip : this.state.siteIP;
    let _self = this;
    this.ws = new WebSocket(url);
    this.ws.onopen = function() {
      _self.setState({
        socketSuccess: true
      })
      ToastAndroid.show("Websocket链接成功", ToastAndroid.SHORT);
    }
    this.ws.onerror = function(err) {
      _self.setState({
        socketSuccess: false
      });
      ToastAndroid.showWithGravity(
            "Websocket链接错误",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }
    this.ws.onmessage = function(msg) {
      let wsdata = JSON.parse(msg.data);
      console.log(wsdata);
      if (_self.state.recResultTextList.length > this.limit) {
        let len = _self.state.recResultTextList.length;
          _self.setState({
            recResultTextList: _self.state.recResultTextList.slice(1, len)
          })
      }
      if (wsdata.text) {
        _self.setState({
          recResultTextList: _self.state.recResultTextList.concat([{timestamp: wsdata.timestamp, text: wsdata.text}])
        });
      }
    }
    this.ws.onclose = function() {
        console.log('colse ws');
        _self.setState({
            socketSuccess: false
        })
    }

  };
  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    if (p === 'authorized') return;
    return this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
  };

  start = () => {
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    let audioFile = await AudioRecord.stop();
    this.setState({ audioFile, recording: false });
  };

  load = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.audioFile) {
        return reject('file path is empty');
      }

      this.sound = new Sound(this.state.audioFile, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }
        this.setState({ loaded: true });
        return resolve();
      });
    });
  };

  play = async () => {
    if (!this.state.loaded) {
      try {
        await this.load();
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ paused: false });
    Sound.setCategory('Playback');

    this.sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
      this.setState({ paused: true });
      // this.sound.release();
    });
  };

  pause = () => {
    this.sound.pause();
    this.setState({ paused: true });
  };
  jump() {
    console.log(this);
    this.navigate.push('myScroll')
  }
  closews() {
      console.log(this.ws);
      if (this.ws) {
          this.ws.onclose ();
      }
  }
  cleartext() {
      this.setState({
          recResultTextList: []
      })
  }
  contentresize() {
      console.log(111)
      this.myscrollView.scrollToEnd({animated: true})
  }
  render() {
    const { recording, paused, audioFile } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.flexhone}>
            <Text>当前WS链接:{this.props.siteIP}</Text>
          <Text>识别结果: </Text>
          <ScrollView
          ref={(view) => {this.myscrollView = view}} 
            onContentSizeChange={this.contentresize.bind(this)}>
            { this.state.recResultTextList.map((item, index) => {
                return (
                <Text style={styles.textstyle} key={item.timestamp}>{item.text}</Text> 
                );
            })}
          </ScrollView>
        </View>
        <View style={styles.row}>
          <Button onPress={this.start}  title="录音" disabled={recording} />
          <Button onPress={this.stop} title="停止" disabled={!recording} />
          {/* {paused ? (
            <Button onPress={this.play} title="回放" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="暂停" disabled={!audioFile} />
          )} */}
        </View>
        {/* <ActionButton
          buttonColor="rgba(231,76,60,1)"
          position="right"
          offsetY={'60%'}
          hideShadow={true}
          verticalOrientation='down'
          onPress={() => { this.initWS()} }
          renderIcon={() => (<View style={styles.actionButtonView} onPress={() => { this.initWS()} }>
              <Icon name={this.state.socketSuccess ? 'exchange' : 'refresh'} style={styles.actionButtonIcon} />
            </View>)}
        /> */}
        <ActionButton 
            icon={<Icon name={this.state.socketSuccess ? 'exchange' : 'refresh'} color="#fff" size={25}/>}
            buttonColor="rgba(231,76,60,1)"
            position="right"
            style={styles.actionbtn}
            >
            <ActionButton.Item buttonColor='#9b59b6' title="重连" onPress={this.initWS.bind(this)}>
            <Icon name="chain" size={24} style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="断开" onPress={this.closews.bind(this)}>
            <Icon name="chain-broken" size={24}  style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='tomato' title="清屏" onPress={this.cleartext.bind(this)}>
            <Icon name="trash-o" size={26}  style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  textstyle: {
    margin: 8,
    color: '#f00',
    fontWeight: '900'
  },  
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 75

  },
  flexhone: {
    flex: 1
  },  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 5,
    borderTopColor: 'gray',
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  actionbtn: {
    marginBottom: 20,
    marginTop:40
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
