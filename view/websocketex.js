import React, { Component } from 'react';
export default class WS extends Component {
    //...
    send = (data) => this.state.ws.send(data)
    componentDidMount () {
        this.reconnect = !!this.props.reconnect
        this._handleWebSocketSetup()
    }
    componentWillUnmount () {
        this.reconnect = false
        this.state.ws.close()
    }
    _handleWebSocketSetup = () => {
        const ws = new WebSocket(this.props.url)
        ws.onopen = () => {
            this.props.onOpen && this.props.onOpen()
        }
        ws.onmessage = (event) => { this.props.onMessage && this.props.onMessage(event) }
        ws.onerror = (error) => { this.props.onError && this.props.onError(error) }
        ws.onclose = () => this.reconnect ? this._handleWebSocketSetup() : (this.props.onClose && this.props.onClose())
        this.setState({ws})
    }
}