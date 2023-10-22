import React, { useState } from "react";
import { View, Text, Dimensions, useWindowDimensions } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const PAGE_WIDTH = Dimensions.get("window").width;
const colors = [
  { title: "브랜드\n하이라이트", desc: "어쩌구 저쩌구 \n브랜드 이름" },
  { title: "풍성한 이 계절의 \n실루엣", desc: "반가워요 유병훈입니다" },
  { title: "클래식의 간결한 형태", desc: "디스커버리 사고 싶다" },
  { title: "일상에서 여행까지", desc: "30% 할인 시작! \n홈페이지 참고" },
  { title: "더 길게 \n더 멋스럽게", desc: "안녕 이건 1번 콘텐츠야" },
];

const TabOneScreen = () => {
  const dimension = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Carousel
        width={dimension.width}
        height={dimension.width * 1.2}
        loop
        style={{
          width: PAGE_WIDTH,
          justifyContent: "center",
          alignItems: "center",
        }}
        modeConfig={{
          parallaxAdjacentItemScale: 0.8,
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: dimension.width / 8,
        }}
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={2500}
        mode="parallax"
        data={colors}
        renderItem={({ index, animationValue, item }) => (
          <Card animationValue={animationValue} key={index} index={index} item={item} />
        )}
      />
    </View>
  );
};

const Card = ({ index, animationValue, item }) => {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-0.75, 0, 0.75], [0, 1, 0]);
    const translateY = interpolate(animationValue.value, [-1, 0, 1], [64, 0, 64]);

    return {
      opacity,
      transform: [{ translateY }],
    };
  }, [animationValue]);

  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 24,
        borderRadius: 8,
      }}>
      <Animated.View style={[maskStyle, { bottom: 64 }]}>
        <Text style={{ fontSize: 26, fontWeight: "500" }}>{item.title}</Text>
        <Text style={{ marginTop: 18 }}>{item.desc}</Text>
      </Animated.View>
    </View>
  );
};

export default TabOneScreen;
