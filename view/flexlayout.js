import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Flexlayout extends Component {
    constructor() {
        super();
    };
    createNum(num){
        return parseInt(num);
    };
    render() {
        let textList = new Array(4).fill(this.createNum(Math.random()*10));
        let color = ['powderblue', 'skyblue', 'steelblue']
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 150}}>
                {textList.map((text, index) => {
                    return(
                        <Text style={{flex: index + 1, backgroundColor: color[index] ? color[index] : color[0], textAlign: 'center'}} key={index}>{text}</Text>
                    )
                })}
            </View>
        );
    }  
};