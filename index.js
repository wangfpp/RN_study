/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './router/index'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Router);
