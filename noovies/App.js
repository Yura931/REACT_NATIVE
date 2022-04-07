import React from 'react';
import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useState } from 'react';
import { Image, useColorScheme } from 'react-native';
import Root from './navigation/Root';
import Tabs from './navigation/Tabs';
import Stack from './navigation/Stack';

const loadFonts = (fonts) => fonts.map( (font) => Font.loadAsync(font)); // 여러개의 Font.loadAsync(font)로 이루어진 배열
const loadImages = (images) => images.map( (image) => { // Image.prefetch(image)나 Asset.loadAsync(image)로 이루어진 배열을 받음
  if(typeof image === "String") {
    return Image.prefetch(image);
  } else {
    return Asset.loadAsync(image);
  }
});


export default function App() {

  // AppLoading에서 assets을 preload 하는 작업만 한다면 30~62 로직보다 useAssets, useFonts hook을 사용하는 것이 더 간단
  // 로딩 과정에서 다른 작업을 하고 싶다면 startLoading 함수 새로 생성해주는 것이 좋음

  // const [assets] = useAssets([require("./sky.jpg")]); 
  // const [loaded] = Font.useFonts(Ionicons.font); // 원격 이미지를 불러오는 Image.prefetch()를 사용 불가능

  // if(!assets || !loaded) {
  //  return <AppLoading />;
  // }
  

  
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);

  
  const startLoading = async() => {
    // 로딩하고 싶은 것들을 전부 담는 곳
    // preload가 필요한 이유 : api를 호출 할 수도 있고, 어플이 디스플레이 되기전에 정보들을 받아올 수 있음, video 요소를 먼저 불러올 수도 있고, tlwkrwjs db를 열어 preload 할수도 있음
    // 아이콘들을 미리 불러둘 때에도 사용
    const setTime = new Promise((resolve) => setTimeout(resolve, 10000));
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
        require("./sky.jpg"), 
        "https://i.pinimg.com/474x/e9/81/45/e981456a52443c0bd555dbe87de3e1ba.jpg"
      ]);
    
    await Promise.all([setTime, ...fonts, ...images]);
    
    
    await Font.loadAsync(Ionicons.font); //Ionicons의 font파일에 접근
    await Asset.loadAsync(require('./sky.jpg')); // 로컬 파일
    await Image.prefetch("https://i.pinimg.com/474x/e9/81/45/e981456a52443c0bd555dbe87de3e1ba.jpg"); // 서버 파일 -> 왜 사용하는지 잘 모르겠음, prefetch하고 싶은 이미지가 있따면, 그냥 저장해서 require를 사용하는게 더 좋음 / 서버가 다운되면 prefetch가 작동하지 않을 것이기 때문에
    
  };

  // if 앞에 hook 사용
  const isDark = useColorScheme() === "dark";
  if (!ready) {
    return (
     <AppLoading     
            startAsync={startLoading}
            onFinish={onFinish} 
            onError={console.error} 
          /> 
    // startLoading 함수가 종료되면 onFinish함수가 호출, onFinish함수가 호출되며 ready의 상태값이 true로 변해 AppLoding이 더이상 실행되지 않음
    );
  }
  // stack navigator든 tab navigator든 만든 navigator를 렌더링 하려면 먼저 NavigationContainer라는 것을 렌더링 해야 함
  // navigation의 theme을 사용해 다크모드, 라이트모드 쉽게 적용할 수 있음

  return (
    <NavigationContainer theme={ isDark ? DarkTheme : DefaultTheme }>
      <Root />
    </NavigationContainer>
  );
}

