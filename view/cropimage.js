import React, { Component } from 'react';
import { View, Text, Image, Button, ScrollView, ImageEditor, ListView } from 'react-native';
import { CheckBox} from 'react-native-elements'

export default class CropImage extends Component {
    constructor(props) {
        super(props);
    }
    image = null;
    state = {
        imgpath: 'http://172.16.1.36:19319/img/qd.png',
        cropImagePath: '',
        cropName: 'wangfpp',
        namelist: ['sundy', 'gunn', 'wangfpp', 'liugy', 'yangyf', 'sunkw', 'langw']
    }
    componentDidMount() {

    }
    btnpress() {
    }
    conso(a) {
        const cropData = {
            offset: {x: 749, y: 433},
            size: {width: 186, height: 174},
            displaySize:{width:186, height:174}, //THESE 2 ARE OPTIONAL.
            resizeMode:'contain',
        }
        ImageEditor.cropImage(this.state.imgpath,
            cropData, (successURI) => {
                // succCallback(successURI)
                console.log(successURI)
                this.setState({
                    cropImagePath: successURI
                })
                // console.log(successURI);
            },
            (error) => {
                console.log('cropImage,', error)
            }
        )
    }
    changeName(name, e) {
        this.setState({
            cropName: name
        })
    }
    render() {
        return (
            <View style={{width: '100%', height: '100%'}}>
                <ScrollView style={{flex: 1}}>
                    <View style={{width: '100%', height: 400}}>
                        <Image 
                            source={{uri: this.state.imgpath}}
                            onLoadEnd={this.conso.bind(this)}
                            resizeMode="contain"
                            style={{width: 'auto', height: '100%'}}>
                        </Image>
                    </View>
                    <View style={styles.CheckBoxContainer}>
                    {this.state.namelist.map((name, index) => {
                        return (<CheckBox
                            center
                            key={index}
                            title={name}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            onPress={this.changeName.bind(this, name)}
                            checked={this.state.cropName === name}
                        />)
                    })}
                    </View>
                    <View style={{height: 400}}>
                        {this.state.cropImagePath ? 
                                (<Image
                                    source={{uri: this.state.cropImagePath}}
                                    style={{width: 'auto', height: 300}}
                                    resizeMode="contain"
                                >
                                </Image>) : (null)
                            
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = {
    CheckBoxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    }
}