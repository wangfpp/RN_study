import React, { Component } from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
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
            mac: ''
        };
        console.log(this);
    }
    componentDidMount() {
        console.log(111)
        // const mac = DeviceInfo.getMACAddress();
        const phoneNumber = DeviceInfo.getPhoneNumber();
        console.log(phoneNumber)
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
            <View style={styles.inputcontent}>
                <TextInput 
                    keyboardType="default"
                    placeholder="请输入WS的ip"
                    value={this.state.ip}
                    returnKeyLabel="确定"
                    onSubmitEditing={ this.changeStoreIP.bind(this) }
                    onChangeText={this.changeip.bind(this)}
                    style={{ borderColor: 'gray', borderWidth: 0, flex: 1}} />
                    <Ionicons name={this.state.icon.name} color={this.state.icon.color} size={28}></Ionicons>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    inputcontent: {
        margin: 5,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        borderColor: '#000',
        borderWidth: 1,
        borderStyle: "solid"
    }
})