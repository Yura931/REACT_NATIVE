import React, { useState, useEffect } from "react";
import { Dimensions, ActivityIndicator, StyleSheet } from "react-native"
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import { BlurView } from "expo-blur";
import { makeImgPath } from './../utils';

const api_key="";

const Container = styled.ScrollView`
`
const View = styled.View`
    flex: 1;
`
const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const BgImg = styled.Image`
`;

const Title = styled.Text`
`;

const {height : SCREEN_HEIGHT} = Dimensions.get("window"); 
// ES6 문법, height: SCREEN_HEIGHT 이런식으로 변수 명 변경 가능, const SCREEN_HEIGHT = Dimensions.get("window").height;와 같은 로직
// 화면값을 Dimensions를 통해 알아 온 후 화면 높이 지정 

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({ navigation: {navigate} }) => { 
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const getNowPlaying = async() => {
        const { results } = await( 
        await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1&region=KR`
            )
        ).json();
        setNowPlaying(results);
        setLoading(false);
    }
    useEffect(() => {
        getNowPlaying();
    }, []) 

    return loading ? ( 
        <Loader>
            <ActivityIndicator /> 
        </Loader>
        ) : (
        <Container>
            <Swiper 
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle = {{ width: "100%", height: SCREEN_HEIGHT / 4}}
            > 
                {nowPlaying.map(movie => <View key={movie.id}>
                    <BgImg 
                        style={StyleSheet.absoluteFill} 
                        source={{uri:makeImgPath(movie.backdrop_path)}} />
                    <BlurView 
                        intensity={80}
                        style={StyleSheet.absoluteFill}>
                        <Title>{movie.original_title}</Title>
                    </BlurView>
                </View>)
                }
            </Swiper>
        </Container>
    );
}

export default Movies;