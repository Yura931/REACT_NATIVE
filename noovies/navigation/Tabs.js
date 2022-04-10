import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Movies from '../screens/Movies';
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { BLACK_COLOR, YELLOW_COLOR } from './../colors';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// 렌더링할 Tabs component 생성
// navigator 생성
// navigator에 screen을 줘야 함, 모든 screen은 name, component 가짐
// screenOptions : 모든 screen에 대한 option, options : 하나의 screen option 설정
// headerRight : react element return
const Tabs = () => { 

    // dark모드 light모드 구분
    // color scheme가져오는 훅, Appearance module 사용
    // return 형식으로 사용 colorScheme 사용 가능
    // open palette, flatuicolors.com

    //themes

       /* 
                아이콘 바꾸는 방법 - tabBarIcon 사용, 옵션으로 Navigator에 두거나 screen에 둘 수도 있음 : screen에 두는걸 선호 
                tabBarIcon : function return, focused, color, size argument들이 주어짐 
              */

    const isDark = useColorScheme() === "dark";
    return (
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: isDark ? BLACK_COLOR : "White",
            }}
        > 
            <Tab.Screen name="Movies" component={Movies} options={{
                tabBarIcon: ({focused, color, size }) => {
                    return <Ionicons name={focused ? "film" : "film-outline"} color={color} size={size} />
                },
                headerTitleStyle: {color: "tomato"}, 
            }}/>
            <Tab.Screen name="TV" component={Tv} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name="tv" color={color} size={size} />
                }
            }}
            />
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size} />
                }
            }}
            />
        </Tab.Navigator>
    );
}
export default Tabs;