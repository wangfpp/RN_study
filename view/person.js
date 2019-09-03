import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Person extends Component {
    render () {
        return (
            <View>
                <Text style={{color: this.props.color}}>
                    Hello, {this.props.name ? this.props.name : 'World'}
                </Text>
            </View>
        )
    }
};
