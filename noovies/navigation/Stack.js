import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { YELLOW_COLOR } from '../colors';

const ScreenOne = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress = {() => navigate("Two")}>
        <Text>One</Text>
    </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress = {() => navigate("Three")}>
        <Text>Two</Text>
    </TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }) => ( 
    <TouchableOpacity onPress ={() => navigate("Tabs", { screen: "Search"})}>
        <Text>Go back</Text>
    </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => <NativeStack.Navigator
    screenOptions={{
        headerTintColor: YELLOW_COLOR,
        headerBackTitlevisible: false,
    }}>
    <NativeStack.Screen name="One" component={ScreenOne} 
        options={{
            presentation: "modal",
            animation: "fade",
        }}
    />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
</NativeStack.Navigator>

export default Stack;
