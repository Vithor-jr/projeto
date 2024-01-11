import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth} = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation();
  const uTranslateX = useSharedValue(0);
  const uImageSize = useSharedValue(screenWidth * 0.3); // Tamanho da imagem inicial como 30% da largura da tela
  const containerOpacity = useSharedValue(0);

  useEffect(() => {
    const showU = async () => {
      uTranslateX.value = withTiming(0, {
        duration: 0,
        easing: Easing.ease,
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      uTranslateX.value = withTiming(screenWidth * 0.16, {
        duration: 500,
        easing: Easing.ease,
      });
      uImageSize.value = withTiming(screenWidth * 0.2, {
        duration: 500,
        easing: Easing.ease,
      });
      runOnJS(startTextContainerAnimation)();
    };

    const startTextContainerAnimation = () => {
      containerOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.ease,
      });

      setTimeout(() => {
        navigation.navigate("Menu"); 
      }, 500); 
    };


    runOnJS(showU)();
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: uTranslateX.value },
        { translateY: 0 },
        { scale: uImageSize.value / (screenWidth * 0.3) },
      ],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  return (
    <View style={style.container}>
      <View style={style.center}>
        <Animated.Image
          source={require("../splash/u.png")}
          style={[style.imageU, animatedImageStyle]}
        />
      </View>
      <View style={style.textContainer}>
        <Animated.Text style={[style.text, animatedContainerStyle]}>stud</Animated.Text>
        <Animated.Text style={[style.text, animatedContainerStyle]}>s</Animated.Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#38217C",
  },
  center: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  imageU: {
    // Defina as dimensões e outros estilos necessários para a imagem
    width: screenWidth * 0.3, // 30% da largura da tela
    height: screenWidth * 0.375, // 37.5% da largura da tela
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: screenWidth * 0.2, // 20% da largura da tela
  },
  text: {
    fontFamily: 'Varela-Round',
    fontSize: screenWidth * 0.2, // 10% da largura da tela
    color: "#F78223",
  },
  textU: {
    fontFamily: 'Varela-Round',
    color: "#8856BB",
  },
});
