import React, { Component } from 'react';
import { View, Alter, Button } from 'react-native';

export default class TouchEvent extends Component {
    constructor(props) {
        super(props);
    }
    pressBut() {
        
    }
    render() {
        return (
            <View>
                <Button onPress={this.pressBut.bind(this)}></Button>
            </View>
        )
    }
};