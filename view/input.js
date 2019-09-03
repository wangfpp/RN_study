import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';

export default class Prompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.value
        }
        
    };
    setText(text) {
       this.setState({
           text: text
       });   
    }
    render() {
        return (
            <View style={{marginTop: 5, width: '100%', overflowY: 'scroll'}}>
                <TextInput 
                    placeholder="请输入点什么"
                    multiline={true}
                    value={this.state.text}
                    onChangeText={this.setText.bind(this)}>
                </TextInput>
                <Text>{this.state.text}</Text>
            </View>
        )
    }
};