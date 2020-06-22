import React, { Component } from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Categories from './src/screens/Categories';
import Setting from './src/screens/Setting';
import Bookmark from './src/screens/Bookmark';
import SinglePost from './src/screens/SinglePost';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
function HomeStackScreen() {
 return (
   <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="SinglePost" component={SinglePost} />
   </HomeStack.Navigator>
  );
}

export default function MyTabs() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Bookmark" component={Bookmark} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}