import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/AntDesign';
import DeviceInfo from 'react-native-device-info';


class SetIP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: props.siteIP,
            iplist: props.iplist,
            icon:  {
                name: 'checkcircleo',
                color: 'green'
            },
            phoneNumber: '',
            mac: ''
        };
    }
    async componentDidMount() {
        let mac = await DeviceInfo.getMACAddress();
        let phonenum = await DeviceInfo.getPhoneNumber();
        this.setState({
            mac
        })
        // DeviceInfo.getIPAddress().then(ip => {
        //     this.setState({
        //         ip: ip ? ip + ':8887' : this.props.siteIP
        //     })
        //     this.changeStoreIP()
        // });
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
    changeOnEnd() {
        this.props.changeStoreIP(this.state.ip);
        this.props.changeIpList(this.state.ip);
    };
    tapHistoryIP(ip) { // 点击历史记录
        this.props.changeStoreIP(ip);
        this.setState({
            ip: ip
        })
    }
    render() {
        return (
            <View style={styles.conatiner}>
                    <View>
                        <View style={styles.inputcontent}>
                            <TextInput 
                            placeholder="请输入WS的ip"
                            value={this.state.ip}
                            returnKeyLabel="确定"
                            onSubmitEditing={ this.changeOnEnd.bind(this) }
                            onChangeText={this.changeip.bind(this)}
                            />
                            <Ionicons name={this.state.icon.name} color={this.state.icon.color} size={26}></Ionicons>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <Text　style={{textAlign: "center", fontSize: 20, fontWeight: "bold"}}>历史IP 点击切换当前IP</Text>
                        <ScrollView style={{flex:1}}>
                        {
                            this.props.iplist.map((item, index) => {
                                return (
                                    item ? <TouchableHighlight key={index} style={{height: 40, display: "flex", justifyContent: "center", alignItems: "center"}} underlayColor="tomato" onPress={this.tapHistoryIP.bind(this, item)}>
                                        <Text  style={{marginBottom: 5, fontSize: 18}}>{item}</Text>
                                    </TouchableHighlight> : null
                                    
                                )
                            })
                        }
                        </ScrollView>
                    </View>
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        iplist: state.iplist,
        siteIP: state.setipreducer.ip
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeStoreIP: ip => {
            dispatch({type: 'SetIP', ip: ip});
        },
        changeIpList:  ip => {
            dispatch({type: '', ip});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetIP);
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