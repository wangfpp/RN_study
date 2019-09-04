import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/AntDesign';
import DeviceInfo from 'react-native-device-info';


export default connect(state => {
	return {
		siteIP: state.setipreducer.ip
	}
})(class SetIP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: this.props.siteIP,
            icon:  {
                name: 'checkcircleo',
                color: 'green'
            },
            phoneNumber: '',
            mac: ''
        };
        console.log(this);
    }
    async componentDidMount() {
        console.log(111)
        let mac = await DeviceInfo.getMACAddress();
        let phonenum = await DeviceInfo.getPhoneNumber();
        console.log(phonenum)
        this.setState({
            mac
        })
        DeviceInfo.getIPAddress().then(ip => {
            this.setState({
                ip: ip ? ip + ':8887' : this.props.siteIP
            })
            this.changeStoreIP()
          });
    }
    changeip(text) {
        let urlpattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
        if (urlpattern.test(text)) {
            this.setState({
                ip: text,
                icon:  {
                    name: 'checkcircleo',
                    color: 'green'
                }
            });
        } else {
            this.setState({
                ip: text,
                icon: {
                    name: 'closecircleo',
                    color: '#f00'
                }
            })
        }
        
    };
    changeStoreIP() {
        this.props.dispatch({
            type: 'SetIP',
            ip: this.state.ip
        });
    };

    render() {
        return (
            <View style={styles.conatiner}>
                    <View style={styles.inputcontent}>
                        <TextInput 
                        placeholder="请输入WS的ip"
                        value={this.state.ip}
                        returnKeyLabel="确定"
                        onSubmitEditing={ this.changeStoreIP.bind(this) }
                        onChangeText={this.changeip.bind(this)}
                         />
                        <Ionicons name={this.state.icon.name} color={this.state.icon.color} size={26}></Ionicons>
                    </View>
                    <Text>MAC地址: {this.state.mac}</Text>
                    <Text>手机号:  {this.state.phoneNumber}</Text>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    conatiner: {
        flex:1,
    },
    inputcontent: {
        margin: 50,
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: "solid"
    }
})