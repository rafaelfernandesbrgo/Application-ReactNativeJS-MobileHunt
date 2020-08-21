import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';
import './src/config/StatusBarConfig'
import 'expo-status-bar';


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return   <Routes /> 
}


