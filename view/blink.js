import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isShow: true,
            id: this.props.navigation.getParam('id')
        };
        let _self = this;
        setInterval(() => {
            _self.setState(previousState => {
                return { isShow: !previousState.isShow};
            })
        }, 1000);
    };
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Blink',
            headerRight: (
            <Button
                onPress={navigation.getParam('addid')}
                title="+1"
                color="#f00"
            />
            ),
        };
    };
    componentDidMount() {
        this.props.navigation.setParams({
            addid: this._addid()
        });
    }
    _addid() {
        this.setState({
            id: this.state.id + 1
        });
        console.log(this.state);
    }
    render() {
        if (!this.state.isShow) {
            return <Text>{this.state.id}</Text>;
        }
        return (<Text style={{backgroundColor: '#0ff'}}>{this.props.text ? this.props.text : 'aaaa'} <Text>{this.state.id}</Text></Text>);
    }
}