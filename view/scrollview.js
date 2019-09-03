import React, { Component } from 'react';
import { ScrollView, Text, Image, View, Platform} from 'react-native';

export default class myScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: new Array(100).fill(0)
        }
    }


    render() {
        return (
            <View style={{height: '100%'}}>
                <ScrollView style={{flex: 1, height: '100%'}}>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        this.state.listView.map((item, index) => {
                            return (
                                <Image
                                    key={index}
                                    // source={require('../asset/image/back.png')}
                                    source={{uri: 'http://172.16.1.36:19319/img/qd.png'}}
                                    resizeMode="contain"
                                    style={{width: '17%', height: 200, marginLeft: 5, marginRight: 5}}
                                ></Image>
                            )
                        })
                    }
                    </View>
                </ScrollView>
            </View>
        )
    }
};
