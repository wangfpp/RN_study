import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Sheet extends Component {
    render() {
        return (
            <View>
                <Text style={styles.red}>红色</Text>
                <Text style={[styles.bigRed, styles.portant]}>大红</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    red: {
        color: '#f00',
        fontSize: 14,
    },
    bigRed: {
        color: '#f00',
        fontSize: 20,
        fontWeight: 'bold'
    },
    portant: {
        color: '#0f0'
    }
});