import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, View, Text, Button } from 'react-native';
import Store from '../store/index';
import { Provider } from 'react-redux';
import Home from '../App';
import Blink from '../view/blink';
import Setting from '../view/setip';
import CropImage from '../view/cropimage';
import Draw from '../view/draw'
import myScroll from '../view/scrollview'

import back from '../asset/image/back.png';
import RNUpdate from "react-native-update-app";
import { testServe } from '../api/test';


// const Realm = require('realm');

// const IpSchema = {
//   name: 'IP',
//   properties: {
//     address: {type: 'string', default: '172.16.1.237:8887'}
//   }
// };

const defaultHeader = { 
    // navigationConfigs
    // initialRouteParams: '', //　路由的初始参数
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: ({ navigation }) => {
        return ({
            headerStyle: {
                backgroundColor: '#2dabff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }) 
    },
    mode: 'card',
    headerMode: 'float',
    headerBackTitleVisible: false
}
const AppNavigator = createStackNavigator(
    { // routeConfigs
        Home: {
            screen: Home,
            navigationOptions: () => ({
                title: '首页'
            })
        },
        Blink: {
            screen: Blink,
            navigationOptions: () => ({
                title: '闪一闪'
            })
        },
        myScroll: {
            screen: myScroll,
            navigationOptions: () => ({
                title: '滚动'
            })
        }
    },
    defaultHeader
);
const settingStackNav = createStackNavigator(
    {
        Setting: {
            screen: Setting,
            navigationOptions: () => ({
                title: '设置IP'
            })
        }
    },
    defaultHeader
);
const mapRouter = {
    Draw: {
        icon: 'ios-brush',
        title: '绘画'
    },
    Setting: {
        icon: 'ios-settings',
        title: '设置'
    },
    CropImage: {
        icon: 'ios-aperture',
        title: '裁剪'
    },
    Home: {
        icon: 'ios-home',
        title: '主页'
    },
    float: {
        icon: 'ios-alarm',
        title: null
    }
}
const myNavigator =  createBottomTabNavigator(
    {
        Home: {
            screen: AppNavigator
        },
        Setting: {
            screen: settingStackNav
        },
        float: {
            screen: () => null,
            navigationOptions: {
                tabBarLabel: () => null,
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    let IconComponent = Ionicons;
                    // You can return any component that you like here!
                    return <IconComponent name="ios-add-circle-outline" size={75} color='tomato'/>;
                }
            }
        },
        CropImage: {
            screen: CropImage
        },
        Draw: {
            screen: Draw
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;
            return ({
                tabBarLabel: mapRouter[routeName]['title'],
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    let IconComponent = Ionicons;
                    // You can return any component that you like here!
                    return <IconComponent name={mapRouter[routeName]['icon']} size={25} color={tintColor} />;
                }
                
            })
        },
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        },
      }
)
const StoreRouter =  createAppContainer(myNavigator);
export default class Route extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
    }
    // url 表示接口地址，在下面有详细介绍
    onBeforeStart = async ()=>{
        // 在这里可以发请求，用promise返回结果
        // let res = await toolApi.updateApp() 
        let res = await testServe.updateApp();
        return res;
        // return res.data
        /*返回结果 res 如下
        {
            "data": {
                "version":"1.1",
                "filename":"微信.apk",
                "url":"http://gdown.baidu.com/data/wisegame/785f37df5d72c409/weixin_1320.apk",
                "desc":["更新了一些bug", "修复了一些UI问题"]
            },
            "error":{"code":0}
        }*/
    }
    
    // realm = Realm;
    render() {
        return (
            <Provider store={Store}>
                <StoreRouter />
                <RNUpdate
                    onBeforeStart={this.onBeforeStart.bind(this)}
                    progressBarColor="#f50"
                    updateBoxWidth={260}      // 选填，升级框的宽度
                    updateBoxHeight={250}      // 选填，升级框的高度
                    updateBtnHeight={38}       // 选填，升级按钮的高度  // 选填，换升级弹框图片
                />
            </Provider>
        )
    }
}